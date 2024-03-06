import { defineStore } from "pinia";
import { API } from "aws-amplify";

import {
  getUserPendingApprovalTests,
  userTests,
  getTestDetail,
  getCategoryDetail,
  listCategoriesDetail,
  listAllTests,
  listTestsByStatus,
  searchSubCategories,
  searchTestManagers,
  getSampleQuestions,
  categorySlug,
  subCategorySlug,
} from "~/ManualGraphql/queries";

import {
  listStaticContents,
  searchCategories,
  listTestManagers,
  getFeedback,
} from "~/graphql/queries";

import {
  createAttemptedTest,
  createResult,
  updateResult,
  updateAttemptedTest,
  addResultStatus,
  createSearchFeedback,
} from "~/graphql/mutations";
import { useMainStore } from "./store";
import { useAuthStore } from "./auth";
// import { useAuthStore } from "./auth";

export const useTestManagementStore = defineStore("testManagement", {
  state: () => ({
    categoryName: null,
    categories: [],
    featuredTests: [],
    recentlyAddedTests: [],
    allApprovedTests: [],
  }),

  actions: {
    async isUserPendingApprovalTests() {
      const authStore = useAuthStore();
      try {
        const user_id = authStore.user.id; //after converting auth
        // const user_id = "ed8604fc-0f58-4b03-964e-80d997e93b90"; //after converting auth
        const userTestsData = await API.graphql({
          query: getUserPendingApprovalTests,
          variables: { id: user_id },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        const allPendingApprovalTests =
          userTestsData?.data?.getUser?.created_tests?.items;
        console.log(allPendingApprovalTests);
        if (allPendingApprovalTests.length) {
          return true;
        }
        return false;
      } catch (error) {
        console.log("Error isUserPendingApprovalTests: " + error);
        return false;
      }
    },

    async getUserTests() {
      console.log("in getUserTests");
      const authStore = useAuthStore();
      const user_id = authStore?.user?.id;
      console.log("user id: " + user_id);
      const mainStore = useMainStore();
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        const userTestsData = await API.graphql({
          query: userTests,
          variables: { id: user_id },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        // Get purchased tests
        const allPurchasedTests = userTestsData.data.getUser.purchased_tests
          .items
          ? userTestsData.data.getUser.purchased_tests.items
          : [];
        // const sortedAllPurchasedTests = await dispatch(
        //   "sortBycreatedAt",
        //   allPurchasedTests
        // );
        const sortedAllPurchasedTests = await this.sortBycreatedAt(
          allPurchasedTests
        );

        // We used filter because in case if someone(admin) deletes test so Attempted test have test object that will be null
        const filterSortedAllPurchasedTests = sortedAllPurchasedTests.filter(
          (test) => test.test
        );
        // commit("setAllPurchasedTests", filterSortedAllPurchasedTests, {
        //   root: true,
        // });
        mainStore.setAllPurchasedTests(filterSortedAllPurchasedTests);

        // Get attempted tests
        const allAttemptedTests = userTestsData.data.getUser.attempted_tests
          .items
          ? userTestsData.data.getUser.attempted_tests.items
          : [];

        // const sortedAllAttemptedTests = await dispatch(
        //   "sortByupdatedAt",
        //   allAttemptedTests
        // );
        const sortedAllAttemptedTests = await this.sortByupdatedAt(
          allAttemptedTests
        );

        // We used filter because in case if someone(admin) deletes test so Attempted test have test object that will be null
        const filterSortedAllAttemptedTests = sortedAllAttemptedTests.filter(
          (test) => test.test
        );
        // commit("setAllAttemptedTests", filterSortedAllAttemptedTests, {
        //   root: true,
        // });
        mainStore.setAllAttemptedTests(filterSortedAllAttemptedTests);

        // Get created tests
        const allCreatedTests = userTestsData.data.getUser.created_tests.items
          ? userTestsData.data.getUser.created_tests.items
          : [];
        // const sortedAllCreatedTests = await dispatch(
        //   "sortBycreatedAt",
        //   allCreatedTests
        // );
        // commit("setAllCreatedTests", sortedAllCreatedTests, { root: true });
        // commit("SET_LOADER", false, { root: true });

        const sortedAllCreatedTests = await this.sortBycreatedAt(
          allCreatedTests
        );
        console.log("all created tests: " + allCreatedTests);
        mainStore.setAllCreatedTests(sortedAllCreatedTests);
        mainStore.SET_LOADER(false);

        return allPurchasedTests;
      } catch (err) {
        console.log("error in getUserTests", err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        // this.$swal.fire({
        //   toast: true,
        //   position: "top-end",
        //   icon: "error",
        //   title: "Something went wrong",
        //   showConfirmButton: false,
        //   timerProgressBar: true,
        //   timer: 7000,
        // });
      }
    },

    async getRecentlyAddedTests() {
      const mainStore = useMainStore();
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);
      try {
        const allRecentlyAddedTestData = await API.graphql({
          query: listTestsByStatus,
          variables: { status: "APPROVED", sortDirection: "DESC", limit: 12 },
        });

        const allRecentlyAddedTest =
          allRecentlyAddedTestData.data.listTestsByStatus.items;
        // commit("setRecentlyAddedTests", allRecentlyAddedTest);
        // commit("SET_LOADER", false, { root: true });
        this.setRecentlyAddedTests(allRecentlyAddedTest);
        this.recentlyAddedTests = allRecentlyAddedTest;
        // console.log("Recently added Test" + allRecentlyAddedTest);
      } catch (err) {
        console.log("Error getRecentlyAddedTests: " + err);
        // commit("SET_LOADER", false, { root: true });
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
      }
    },

    async getAllFeaturedTest() {
      const mainStore = useMainStore();
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      const filter = {
        tags: { contains: "FEATURED" },
      };

      try {
        const allFeaturedTestData = await API.graphql({
          query: listTestsByStatus,
          variables: { status: "APPROVED", filter: filter, limit: 10000 },
        });

        const allFeaturedTest =
          allFeaturedTestData.data.listTestsByStatus.items;
        // commit('setFeaturedTests', allFeaturedTest);
        // commit('SET_LOADER', false, { root: true });
        this.setFeaturedTests(allFeaturedTest);
        this.featuredTests = allFeaturedTest;
        mainStore.SET_LOADER(false);
      } catch (err) {
        console.log("Error getAllFeaturedTest: " + err);
        // commit("SET_LOADER", false, { root: true });
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
      }
    },

    async getAllApprovedTests() {
      const mainStore = useMainStore();
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        const allApprovedTestData = await API.graphql({
          query: listTestsByStatus,
          variables: { status: "APPROVED", limit: 10000 },
        });

        const allApprovedTest =
          allApprovedTestData.data.listTestsByStatus.items;
        // commit("setAllApprovedTests", allApprovedTest);
        // commit("SET_LOADER", false, { root: true });
        this.setAllApprovedTests(allApprovedTest);
        this.allApprovedTests = allApprovedTest;
        // console.log("All approved tests: " + allApprovedTestData);
        mainStore.SET_LOADER(false);
      } catch (err) {
        console.log("Error getAllApprovedTests: " + err);
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        // this.$swal.fire({
        //   toast: true,
        //   position: "top-end",
        //   icon: "error",
        //   title: "Something went wrong",
        //   showConfirmButton: false,
        //   timerProgressBar: true,
        //   timer: 7000,
        // });
      }
    },

    async getAllCategories() {
      // console.log("this is getAllCategories");

      const mainStore = useMainStore();
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        const allCategoriesData = await API.graphql({
          query: listCategoriesDetail,
          variables: { limit: 10000 },
          // authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        const allCategories = allCategoriesData.data.listCategories.items;
        const sortedAllCreatedTests = await this.sortBycreatedAt(allCategories);
        this.setCategories(sortedAllCreatedTests.reverse());
        this.categories = allCategories;
        mainStore.SET_LOADER(false);
        return allCategories;
      } catch (err) {
        // console.log("Error getAllCategories: " + err);
        mainStore.SET_LOADER(false);
        // this.$swal.fire({
        //   toast: true,
        //   position: "top-end",
        //   icon: "error",
        //   title: "Something went wrong",
        //   showConfirmButton: false,
        //   timerProgressBar: true,
        //   timer: 7000,
        // });
      }
    },

    async getAllSubCategories(payload) {
      const categoryId = payload;
      const mainStore = useMainStore();
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        const allSubCategoriesData = await API.graphql({
          query: getCategoryDetail,
          variables: { id: categoryId },
          // authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
        const allSubCategories =
          allSubCategoriesData.data.getCategory.sub_category.items;

        // get category name
        const categoryName = allSubCategoriesData.data.getCategory.name;
        // commit("setCategoryName", categoryName);
        // commit("SET_LOADER", false, { root: true });
        this.setCategoryName(categoryName);
        mainStore.SET_LOADER(false);
        console.log("getAllSubCategories: " + allSubCategories);

        return allSubCategories;
      } catch (err) {
        console.log("Error getAllSubCategories: " + err);
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        // this.$swal.fire({
        //   toast: true,
        //   position: "top-end",
        //   icon: "error",
        //   title: "Something went wrong",
        //   showConfirmButton: false,
        //   timerProgressBar: true,
        //   timer: 7000,
        // });
      }
    },

    async getTestsBySubCategory(payload) {
      const subCategoryId = payload;
      const mainStore = useMainStore();
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        const filter = {
          sub_category_id: { eq: subCategoryId },
          and: { status: { eq: "APPROVED" } },
        };

        const allTestsData = await API.graphql({
          query: listAllTests,
          variables: { filter: filter, limit: 10000 },
          // authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
        const allTests = allTestsData.data.listTestManagers.items;
        // commit("SET_LOADER", false, { root: true });
        console.log("getTestsBySubCategory" + allTests);
        mainStore.SET_LOADER(false);

        return allTests;
      } catch (err) {
        console.log("Error getTestsBySubCategory" + err);
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        // this.$swal.fire({
        //   toast: true,
        //   position: "top-end",
        //   icon: "error",
        //   title: "Something went wrong",
        //   showConfirmButton: false,
        //   timerProgressBar: true,
        //   timer: 7000,
        // });
      }
    },

    async getTestDetail(payload) {
      const testId = payload;
      const mainStore = useMainStore();
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        const testQueryData = await API.graphql({
          query: getTestDetail,
          variables: { id: testId },
          // authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
        const testData = testQueryData.data.getTestManager;
        // commit("SET_LOADER", false, { root: true });
        console.log("getTestDetail: " + testData);
        mainStore.SET_LOADER(false);
        return testData;
      } catch (err) {
        console.log("Error in getTestDetail: " + err);
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        // this.$swal.fire({
        //   toast: true,
        //   position: "top-end",
        //   icon: "error",
        //   title: "Something went wrong",
        //   showConfirmButton: false,
        //   timerProgressBar: true,
        //   timer: 7000,
        // });
      }
    },

    async getSampleQuestions(payload) {
      const testId = payload;
      const mainStore = useMainStore();
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        const questionListData = await API.graphql({
          query: getSampleQuestions,
          variables: { id: testId },
        });
        const questionList =
          questionListData.data.getTestManager.questions.items;

        const sampleQuestions = questionList.map((ques) => {
          const parsedData = JSON.parse(ques.options);
          return {
            ...ques,
            options: Object.entries(parsedData),
          };
        });
        console.log("getSampleQuestions: " + sampleQuestions);
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        return sampleQuestions;
      } catch (err) {
        console.log("Error getSampleQuestions: " + err);
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        // this.$swal.fire({
        //   toast: true,
        //   position: 'top-end',
        //   icon: 'error',
        //   title: 'Something went wrong',
        //   showConfirmButton: false,
        //   timerProgressBar: true,
        //   timer: 7000,
        // });
      }
    },

    async startAttemptingTest({ rootState }, payload) {
      const user_id = rootState.auth.user.id; //need to replace rootState
      const test_id = payload;
      const mainStore = useMainStore();
      const input = {
        status: "IN_PROGRESS",
        test_id,
        user_id,
      };
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);
      try {
        const attemptTestCreateDetail = await API.graphql({
          query: createAttemptedTest,
          variables: { input },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        console.log(attemptTestCreateDetail.data.createAttemptedTest);
        return attemptTestCreateDetail.data.createAttemptedTest;
      } catch (err) {
        console.log("Error startAttemptingTest" + err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        // this.$swal.fire({
        //   toast: true,
        //   position: 'top-end',
        //   icon: 'error',
        //   title: 'Something went wrong',
        //   showConfirmButton: false,
        //   timerProgressBar: true,
        //   timer: 7000,
        // });
        return false;
      }
    },

    async answerSubmit(payload) {
      const question_id = payload.questionId;
      const attempted_id = payload.attemptedId;
      const user_input = payload.userInput;
      const mainStore = useMainStore();

      let result_id = payload.result_id ? payload.result_id : false;

      // commit("SET_LOADER", true, { root: true });
      mainStore.SET_LOADER(true);
      let resultData;
      try {
        // first time attempt question create result ELSE update the result
        if (!result_id) {
          const input = {
            question_id,
            attempted_id,
            user_input,
          };

          resultData = await API.graphql({
            query: createResult,
            variables: { input },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
          result_id = resultData.data.createResult.id;
        } else {
          const input = {
            id: result_id,
            user_input,
          };

          await API.graphql({
            query: updateResult,
            variables: { input },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
        }

        // Add status (correct or incorrect answer)
        const addResultStatusData = await API.graphql({
          query: addResultStatus,
          variables: {
            result_id,
          },
        });

        const parsedData = JSON.parse(addResultStatusData.data.addResultStatus);
        if (parsedData.statusCode === "200" || parsedData.statusCode === 200) {
          // commit("SET_LOADER", false, { root: true });
          mainStore.SET_LOADER(false);
          // only when result is creates "createResult"
          if (resultData) {
            const resultData2 = resultData.data.createResult;
            const resultObj = {
              question: {
                question: resultData2.question.question,
                answer: resultData2.question.answer,
                options: resultData2.question.options,
                explainantion: resultData2.question.explainantion,
                marks: resultData2.question.marks,
              },
              question_id: resultData2.question_id,
              // this will not update because we are not fetching again or creating or get response from "addResultStatusData"
              result_status: resultData2.result_status,
              user_input: resultData2.user_input,
              // result id
              id: resultData2.id,
            };
            return resultObj;
          }
          return true;
        }

        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        return false;
      } catch (err) {
        console.log("Error in answerSubmit" + err);
        // commit("SET_LOADER", false, { root: true });
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

    async compeletedTest(payload) {
      const mainStore = useMainStore();
      const attempted_id = payload;
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        const input = {
          id: attempted_id,
          status: "COMPLETED",
        };
        await API.graphql({
          query: updateAttemptedTest,
          variables: { input },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        // await dispatch('getUserTests');
        // commit('SET_LOADER', false, { root: true });
        this.getUserTests();
        mainStore.SET_LOADER(false);
        return true;
      } catch (err) {
        console.log("Error in completedTest: " + err);
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

    async abortedAttemptedTest(payload) {
      const mainStore = useMainStore();
      const attempted_id = payload;
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        const input = {
          id: attempted_id,
          status: "ABORTED",
        };
        await API.graphql({
          query: updateAttemptedTest,
          variables: { input },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        return true;
      } catch (err) {
        console.log("Error in abortAttemptedTest: " + err);
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

    async setTestRemainingTime(payload) {
      const mainStore = useMainStore();
      const attempted_id = payload.attemptedId;
      const remaining_time = payload.remainingTime;
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        const input = {
          id: attempted_id,
          remaining_time,
        };
        await API.graphql({
          query: updateAttemptedTest,
          variables: { input },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        return true;
      } catch (err) {
        console.log("Error in setTestRemainingTime: " + err);
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

    async getTestByQuery(payload) {
      const mainStore = useMainStore();
      try {
        const query = payload.toLowerCase().replace(/\s+/g, " ").trim();
        // commit('SET_LOADER', true, { root: true });
        mainStore.SET_LOADER(true);

        const filter = {
          title: { matchPhrasePrefix: query },
          status: { eq: "APPROVED" },
        };
        const subCategoryFilter = {
          name: { matchPhrasePrefix: query },
        };
        const allTestData = await API.graphql({
          query: searchTestManagers,
          variables: { filter: filter, limit: 10000 },
          // authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
        // searchSubCategories
        const allSubCategory = await API.graphql({
          query: searchSubCategories,
          variables: { filter: subCategoryFilter, limit: 10000 },
          // authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
        const allCategory = await API.graphql({
          query: searchCategories,
          variables: { filter: subCategoryFilter, limit: 10000 },
          // authMode: 'AMAZON_COGNITO_USER_POOLS',
        });

        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        const testList = allTestData.data.searchTestManagers.items;
        const subCategoryList = allSubCategory.data.searchSubCategories.items;
        const categoryList = allCategory.data.searchCategories.items;
        if (
          !testList.length &&
          !categoryList.length &&
          !subCategoryList.length
        ) {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "warning",
            title: "No search result found",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 7000,
          });
        }
        return { testList, subCategoryList, categoryList };
      } catch (err) {
        console.log("Error in getTestByQuery: " + err);
        // commit("SET_LOADER", false, { root: true });
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

    // used inside protected pages login
    async getTestInstruction() {
      const mainStore = useMainStore();
      try {
        // commit('SET_LOADER', true, { root: true });
        const staticData = await API.graphql({
          query: listStaticContents,
        });
        const staticDataArray = staticData.data.listStaticContents.items;
        const testInstruction = staticDataArray.find(
          (obj) => obj.name === "TestInstruction"
        );
        // commit('SET_LOADER', false, { root: true });
        if (testInstruction) {
          return testInstruction.body;
        }
        console.log("getTestInstruction: " + staticDataArray);
        return false;
      } catch (err) {
        console.log("Error getTestInstruction: " + err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        // this.$swal.fire({
        //   toast: true,
        //   position: "top-end",
        //   icon: "error",
        //   title: "Something went wrong",
        //   showConfirmButton: false,
        //   timerProgressBar: true,
        //   timer: 7000,
        // });
        return false;
      }
    },

    // Start - Only to get ID
    async getCategoryIdBySlug(payload) {
      const mainStore = useMainStore();
      const slug = payload;
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        const filter = {
          slug: { eq: slug },
        };
        const categoryData = await API.graphql({
          query: categorySlug,
          variables: { filter, limit: 10000 },
        });
        const categoryArray = categoryData.data.listCategories.items;
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        if (categoryArray.length && categoryArray[0].id) {
          return categoryArray[0].id;
        }
        return false;
      } catch (err) {
        console.log("Error getCategoryIdBySlug: " + err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
      }
    },

    async getSubCategoryIdBySlug(payload) {
      const mainStore = useMainStore();
      const slug = payload;
      // commit("SET_LOADER", true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        const filter = {
          slug: { eq: slug },
        };
        const subCategoryData = await API.graphql({
          query: subCategorySlug,
          variables: { filter, limit: 10000 },
        });
        const subCategoryArray = subCategoryData.data.listSubCategories.items;
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        if (subCategoryArray.length && subCategoryArray[0].id) {
          return subCategoryArray[0].id;
        }
        return false;
      } catch (err) {
        console.log("Error getSubCategoryIdBySlug: " + err);
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
      }
    },

    async getTestIdBySlug(payload) {
      const mainStore = useMainStore();
      const slug = payload;
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        const filter = {
          slug: { eq: slug },
        };
        const testQueryData = await API.graphql({
          query: listTestManagers,
          variables: { filter, limit: 10000 },
        });
        const testsArray = testQueryData.data.listTestManagers.items;
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        if (testsArray.length && testsArray[0].id) {
          // Slug is available
          return testsArray[0].id;
        }
        // Slug is not available
        return false;
      } catch (err) {
        console.log("Error getTestIdBySlug: " + err);
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
      }
    },
    // End - Only to get ID

    async getFeedbackPurchasedTest(payload) {
      const mainStore = useMainStore();
      const purchased_id = payload;
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        // Feedback ID and Purchased will be same (because purchased and feedback id will be unique)
        const feedbackQueryData = await API.graphql({
          query: getFeedback,
          variables: { id: purchased_id },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        const feedback = feedbackQueryData.data.getFeedback;
        // mainStore.SET_LOADER(false); //! use this but not in original code
        return feedback;
      } catch (err) {
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

    async searchFeedback(payload) {
      const mainStore = useMainStore();
      const input = {
        user_email: payload.email,
        description: payload.description,
      };
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        await API.graphql({
          query: createSearchFeedback,
          variables: {
            input,
          },
        });

        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Feedback submitted",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return true;
      } catch (err) {
        console.log("Error searchFeedback: " + err);
        // commit("SET_LOADER", false, { root: true });
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

    setCategoryName(payload) {
      this.categoryName = payload.categoryName;
    },

    setRecentlyAddedTests(payload) {
      this.recentlyAddedTests = payload.recentlyAddedTests;
    },

    setFeaturedTests(payload) {
      this.featuredTests = payload.featuredTests;
    },

    setCategories(payload) {
      this.categories = payload.categories;
    },
    setAllApprovedTests(payload) {
      this.allApprovedTests = payload.allApprovedTests;
    },

    // Start Local function
    sortBycreatedAt(payload) {
      return payload.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    },

    sortByupdatedAt(payload) {
      return payload.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    },
    // End Local function
  },
});
