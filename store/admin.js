// src/stores/admin.js

import { API } from "aws-amplify";
import {
  listAllTests,
  subCategoryUpdate,
  listFeedbacksAdmin,
} from "~/ManualGraphql/queries";
import {
  listCategories,
  getSubCategory,
  listSearchFeedbacks,
} from "~/graphql/queries";
import {
  updateTestManager,
  createCategory,
  createSubCategory,
  updateSubCategory,
  updateCategory,
  updateSearchFeedback,
} from "~/graphql/mutations";
import { useMainStore } from "./store";
import { useTestManagementStore } from "./testManagement";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    allTests: [],
    editCatSubCat: {
      id: null,
      name: null,
      imageUrl: null,
    },
  }),
  actions: {
    async getAllTests() {
      const mainStore = useMainStore();
      const testManagement = useTestManagementStore();
      try {
        // Set loader state
        // commit('SET_LOADER', true, { root: true });
        mainStore.SET_LOADER(true);

        // Fetch all tests data from API
        const allTestsData = await API.graphql({
          query: listAllTests,
          variables: { limit: 10000 },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        // Extract all tests from the response
        const allTests = allTestsData.data.listTestManagers.items;
        // const sortedAllTests = await dispatch('testManagement/sortBycreatedAt', allTests, {
        //   root: true,
        // });
        const sortedAllTests = await testManagement.sortBycreatedAt(allTests);

        // commit('setAllTests', sortedAllTests);
        // commit('SET_LOADER', false, { root: true });

        // Set the allTests state
        this.setAllTests(sortedAllTests);

        // Reset loader state
        mainStore.SET_LOADER(false);

        return true;
      } catch (err) {
        console.log("Error getAllTests: " + err);
        // commit('SET_LOADER', false, { root: true });
        // Handle error
        mainStore.SET_LOADER(false);

        // Optionally, you can show an error message
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      }
    },

    async approveRejectTest(payload) {
      // Implement the function
      const mainStore = useMainStore();
      const test_id = payload.testId;
      const statusName = payload.status;
      const rejectDescription = payload.rejectDescription
        ? payload.rejectDescription
        : null;

      // commit("SET_LOADER", true, { root: true });
      mainStore.SET_LOADER(true);

      let status;
      if (statusName === "approve") {
        status = "APPROVED";
      } else if (statusName === "reject") {
        status = "REJECTED";
      } else if (statusName === "pending") {
        status = "PENDING_APPROVAL";
      } else {
        return false;
      }

      try {
        let input = {
          id: test_id,
          status,
        };
        if (rejectDescription) {
          input = {
            ...input,
            reject_description: rejectDescription,
          };
        }
        await API.graphql({
          query: updateTestManager,
          variables: { input },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        // await dispatch('getAllTests');
        // commit('SET_LOADER', false, { root: true });

        await this.getAllTests();
        mainStore.SET_LOADER(false);
        return true;
      } catch (err) {
        console.log("Error approveRejectTest: " + err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      }
    },

    async createNewCategory(payload) {
      // Implement the function
      const mainStore = useMainStore();
      const testManagement = useTestManagementStore();
      try {
        const categoryDetail = payload;
        // commit('SET_LOADER', true, { root: true });
        mainStore.SET_LOADER(true);

        let categorySlug = categoryDetail.name
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");

        let isSlugAvailable = false;
        // isSlugAvailable = await dispatch('getCategoryBySlug', categorySlug);
        isSlugAvailable = this.getCategoryBySlug(categorySlug);
        if (isSlugAvailable) {
          // commit('SET_LOADER', false, { root: true });
          mainStore.SET_LOADER(false);
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: `${categoryDetail.name} category is already exist`,
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 7000,
          });
          return false;
        }

        const input = {
          name: categoryDetail.name,
          image: categoryDetail.imageUrl,
          slug: categorySlug,
        };

        const createdCat = await API.graphql({
          query: createCategory,
          variables: { input },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        const categoryId = createdCat.data.createCategory.id;

        let isValid;
        for (let i = 0; i < categoryDetail.subCat.length; i++) {
          isValid = await this.createNewSubCategory({
            categoryId: categoryId,
            subCatDetail: categoryDetail.subCat[i],
          });

          if (!isValid) {
            break;
          }
        }

        if (!isValid) {
          // commit('SET_LOADER', false, { root: true });
          mainStore.SET_LOADER(false);
          return isValid;
        }

        // await dispatch('testManagement/getAllCategories', false, {
        //   root: true,
        // });
        await testManagement.getAllCategories(false);

        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        return true;
      } catch (err) {
        console.log("Error createNewCategory: " + err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      }
    },

    async createNewSubCategory(_, payload) {
      // Implement the function
      try {
        const category_id = payload.categoryId;
        const subCatDetail = payload.subCatDetail;
        let subCatSlug = subCatDetail.name
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");

        const input = {
          name: subCatDetail.name,
          slug: subCatSlug,
          image: subCatDetail.imageUrl,
          category_id,
        };

        await API.graphql({
          query: createSubCategory,
          variables: { input },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        return true;
      } catch (err) {
        console.log("Error createNewSubCategory: " + err);
        return false;
      }
    },

    async updateCategory(payload) {
      // Implement the function
      const mainStore = useMainStore();
      const testManagement = useTestManagementStore();
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);
      const categoryDetail = payload;
      try {
        let categorySlug = categoryDetail.name
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");

        let isSlugAvailable = false;
        // isSlugAvailable = await dispatch('getCategoryBySlug', categorySlug);
        isSlugAvailable = await this.getCategoryBySlug(categorySlug);
        if (
          isSlugAvailable &&
          categoryDetail.imageUrl === isSlugAvailable.image
        ) {
          // commit('SET_LOADER', false, { root: true });
          mainStore.SET_LOADER(false);
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: `${categoryDetail.name} category is already exist`,
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 7000,
          });
          return false;
        }

        const input = {
          id: categoryDetail.categoryId,
          name: categoryDetail.name,
          image: categoryDetail.imageUrl,
          slug: categorySlug,
        };
        await API.graphql({
          query: updateCategory,
          variables: { input },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        // await dispatch('testManagement/getAllCategories', false, {
        //   root: true,
        // });
        await testManagement.getAllCategories(false);

        mainStore.SET_LOADER(false);
        return true;
      } catch (err) {
        console.log("Error updateCategory: " + err);
        mainStore.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      }
    },

    async updateSubCategory(payload) {
      // Implement the function
      const mainStore = useMainStore();
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);
      const subCatName = payload.name;
      const subCatImageUrl = payload.imageUrl;
      const subCatId = payload.subCategoryId;

      let subCategorySlug = subCatName
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

      let isSlugAvailable = false;
      // isSlugAvailable = await dispatch('getSubCategoryBySlug', {
      //   subCategoryId: subCatId,
      //   slug: subCategorySlug,
      // });
      isSlugAvailable = await this.getSubCategoryBySlug({
        subCategoryId: subCatId,
        slug: subCategorySlug,
      });

      if (isSlugAvailable) {
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: `"${subCatName}" is already exist in "${isSlugAvailable.category.name}" category`,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      }

      try {
        const input = {
          id: subCatId,
          name: subCatName,
          image: subCatImageUrl,
          slug: subCategorySlug,
        };

        await API.graphql({
          query: updateSubCategory,
          variables: { input },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        return true;
      } catch (err) {
        console.log("Error updateSubCategory: " + err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      }
    },

    async addSubCategoriesInCategory(payload) {
      // Implement the function
      const mainStore = useMainStore();
      try {
        const categoryId = payload.categoryId;
        const subCatArr = payload.subCat;
        // commit('SET_LOADER', true, { root: true });
        mainStore.SET_LOADER(true);

        let isValid;
        for (let i = 0; i < subCatArr.length; i++) {
          // isValid = await dispatch("createNewSubCategory", {
          //   categoryId,
          //   subCatDetail: subCatArr[i],
          // });
          isValid = this.createNewSubCategory({
            categoryId,
            subCatDetail: subCatArr[i],
          });

          if (!isValid) {
            break;
          }
        }

        if (!isValid) {
          // commit('SET_LOADER', false, { root: true });
          mainStore.SET_LOADER(false);
          return isValid;
        }

        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        return true;
      } catch (err) {
        console.log("Error addSubCategoriesInCategory: " + err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      }
    },

    async getCategoryBySlug(payload) {
      // Implement the function
      const mainStore = useMainStore();
      const slug = payload;
      try {
        const filter = {
          slug: { eq: slug },
        };
        const testQueryData = await API.graphql({
          query: listCategories,
          variables: { filter, limit: 10000 },
        });
        const categoryArray = testQueryData.data.listCategories.items;
        if (categoryArray.length && categoryArray[0].id) {
          // Slug is available
          return categoryArray[0];
        }
        // Slug is not available
        return false;
      } catch (err) {
        console.log("Error getCategoryBySlug: " + err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        return false;
      }
    },

    async getSubCategoryBySlug(payload) {
      // Implement the function
      const mainStore = useMainStore();
      const subCategoryId = payload.subCategoryId;
      const slug = payload.slug;
      try {
        const testQueryData = await API.graphql({
          query: subCategoryUpdate,
          variables: { id: subCategoryId, slug },
        });
        const subCategoryArray =
          testQueryData.data.getSubCategory.category.sub_category.items;
        if (subCategoryArray.length && subCategoryArray[0].id) {
          // Slug is available
          return subCategoryArray[0];
        }
        // Slug is not available
        return false;
      } catch (err) {
        console.log("Error getSubCategoryBySlug: " + err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        return false;
      }
    },

    async getAllFeedbacks() {
      // Implement the function
      const mainStore = useMainStore();
      const testManagement = useTestManagementStore();
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);
      try {
        // Since we are fetching purchased test so we have to give "authMode" in query
        const feedbackQueryData = await API.graphql({
          query: listFeedbacksAdmin,
          variables: { limit: 10000 },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        const feedbackArray = feedbackQueryData.data.listFeedbacks.items;
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);

        let sortedFeedbackArray = feedbackArray;
        // If feedbackArray has a length, we sort by updated timestamp
        if (feedbackArray.length) {
          // sortedFeedbackArray = await dispatch('testManagement/sortByupdatedAt', feedbackArray, {
          //   root: true,
          // });
          sortedFeedbackArray = await testManagement.sortByupdatedAt(
            feedbackArray
          );
        }
        return sortedFeedbackArray;
      } catch (err) {
        console.log("Error getAllFeedbacks: " + err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      }
    },

    async getAllSearchFeedbacks() {
      // Implement the function
      const mainStore = useMainStore();
      const testManagement = useTestManagementStore();
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);
      try {
        const searchFeedbackQueryData = await API.graphql({
          query: listSearchFeedbacks,
          variables: { limit: 10000 },
        });
        const searchFeedbackArray =
          searchFeedbackQueryData.data.listSearchFeedbacks.items;
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);

        let sortedSearchFeedbackArray = searchFeedbackArray;
        // If searchFeedbackArray has a length, we sort by created timestamp
        if (searchFeedbackArray.length) {
          // sortedSearchFeedbackArray = await dispatch(
          //   'testManagement/sortBycreatedAt',
          //   searchFeedbackArray,
          //   {
          //     root: true,
          //   },
          // );
          sortedSearchFeedbackArray = await testManagement.sortBycreatedAt(
            searchFeedbackArray
          );
        }
        return sortedSearchFeedbackArray;
      } catch (err) {
        console.log("Error getAllSearchFeedbacks: " + err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      }
    },

    async approveRejectSearchFeedback(payload) {
      // Implement the function
      const mainStore = useMainStore();
      const searchFeedbackID = payload.searchFeedbackID;
      const statusName = payload.status;

      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      let status;
      if (statusName === "approve") {
        status = "APPROVED";
      } else if (statusName === "reject") {
        status = "REJECTED";
      } else {
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        return false;
      }

      try {
        let input = {
          id: searchFeedbackID,
          status,
        };

        await API.graphql({
          query: updateSearchFeedback,
          variables: { input },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        return true;
      } catch (err) {
        console.log("Error approveRejectSearchFeedback: " + err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      }
    },

    // Mutations can be directly placed in the store definition
    async setAllTests(allTests) {
      this.allTests = allTests;
    },

    setEditCatSubCat(editCatSubCat) {
      const { id, name, imageUrl } = editCatSubCat;
      this.editCatSubCat.id = id;
      this.editCatSubCat.name = name;
      this.editCatSubCat.imageUrl = imageUrl;
    },

    resetEditCatSubCat() {
      this.editCatSubCat.id = null;
      this.editCatSubCat.name = null;
      this.editCatSubCat.imageUrl = null;
    },
  },
});
