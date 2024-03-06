import { v4 as uuidv4 } from "uuid";
import { API } from "aws-amplify";
// import { Storage } from "@capacitor/storage";
import {
  onboardingStripe,
  getBalance,
  redirectPayoutDashboard,
  getStripeIdStatus,
} from "~/graphql/queries";
import {
  createTestManager,
  updateTestManager,
  createQuestion,
  updateUser,
} from "~/graphql/mutations";
import { useMainStore } from "./store";
import { useAuthStore } from "./auth";
import { useTestManagementStore } from "./testManagement";

export const sellerStore = defineStore("seller", {
  state: () => ({}),
  actions: {
    async createTest(payload) {
      const mainStore = useMainStore();
      const authStore = useAuthStore();
      const testManagement = useTestManagementStore();
      const user_id = authStore.user.id;
      const testDetail = payload.testDetail;
      const questionList = payload.questionList;
      //   commit("SET_LOADER", true, { root: true });
      mainStore.SET_LOADER(true);

      let testSlug = testDetail.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

      let isSlugAvailable = false;
      do {
        // isSlugAvailable = await dispatch(
        //   "testManagement/getTestIdBySlug",
        //   testSlug,
        //   { root: true }
        // );
        isSlugAvailable = await testManagement.getTestIdBySlug(testSlug);
        // Keep loader on in loop
        // commit("SET_LOADER", true, { root: true });
        mainStore.SET_LOADER(true);
        if (isSlugAvailable) {
          testSlug = testSlug + "-" + uuidv4();
        }
      } while (isSlugAvailable);
      try {
        const input = {
          user_id,
          title: testDetail.title,
          category_id: testDetail.categoryId,
          description: testDetail.description,
          price: testDetail.price,
          time_limit: testDetail.timeLimit,
          category_id: testDetail.categoryId,
          sub_category_id: testDetail.subCategoryId,
          credit: testDetail.credit,
          blog_link: testDetail.blog_link,
          slug: testSlug,
        };
        const createdtest = await API.graphql({
          query: createTestManager,
          variables: { input },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        const testId = createdtest.data.createTestManager.id;

        let isValid;
        for (let i = 0; i < questionList.length; i++) {
          //   isValid = await dispatch("createQuestion", {
          //     testId,
          //     questionDetail: questionList[i],
          //   });
          isValid = await this.createQuestion({
            testId,
            questionDetail: questionList[i],
          });
          if (!isValid) {
            break;
          }
        }
        if (!isValid) {
          //   commit("SET_LOADER", false, { root: true });
          mainStore.SET_LOADER(false);
          return isValid;
        }

        // await dispatch("testManagement/getUserTests", false, { root: true });
        await testManagement.getUserTests(false);
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        return true;
      } catch (err) {
        console.log("Error createTest: " + err);
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

    async createQuestion(payload) {
      const test_id = payload.testId;
      const questionDetail = payload.questionDetail;
      try {
        const input = {
          test_id,
          question: questionDetail.question,
          answer: questionDetail.answer,
          explainantion: questionDetail.explanation,
          options: questionDetail.options,
          is_showcase: questionDetail.is_showcase,
          marks: 1,
        };

        await API.graphql({
          query: createQuestion,
          variables: { input },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        return true;
      } catch (err) {
        console.log("Error createQuestion: " + err);
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

    async stripeOnboarding() {
      const mainStore = useMainStore();
      const authStore = useAuthStore();
      //   commit("SET_LOADER", true, { root: true });
      mainStore.SET_LOADER(true);
      try {
        const stripeURLData = await API.graphql({
          query: onboardingStripe,
        });
        const parsedData = JSON.parse(stripeURLData.data.onboardingStripe);
        const user_id = rootState.auth.user.id;
        const url = parsedData.body.account_link;
        const stripe_seller_id = parsedData.body.account_id;
        const input = {
          id: user_id,
          stripe_seller_id,
        };
        await API.graphql({
          query: updateUser,
          variables: { input },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        // commit("auth/setStripeSeller", stripe_seller_id, { root: true });
        authStore.setStripeSeller(stripe_seller_id);
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        return url;
      } catch (err) {
        console.log("Error stripOnBoarding: " + err);
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

    async getBalanceDetail() {
      const mainStore = useMainStore();
      const authStore = useAuthStore();
      const seller_id = authStore.user.stripe_seller_id;
      //   commit("SET_LOADER", true, { root: true });

      try {
        const getBanalceData = await API.graphql({
          query: getBalance,
          variables: {
            seller_id,
          },
        });
        const parsedData = JSON.parse(getBanalceData.data.getBalance);
        const balanceDetail = parsedData.body.balance_detail[0];
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        return balanceDetail;
      } catch (err) {
        console.log("Error getBalanceDetail: " + err);
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

    async redirectExpressDashboard() {
      const mainStore = useMainStore();
      const authStore = useAuthStore();
      const seller_id = authStore.user.stripe_seller_id;
      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);
      try {
        const getLink = await API.graphql({
          query: redirectPayoutDashboard,
          variables: {
            seller_id,
          },
        });
        const parsedData = JSON.parse(getLink.data.redirectPayoutDashboard);
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        if (parsedData.statusCode !== 200) {
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
        return parsedData.body.link.url;
      } catch (err) {
        console.log("Error redirectExpressDashboard: " + err);
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

    async getStripeIdStatus() {
      const mainStore = useMainStore();
      const authStore = useAuthStore();
      const seller_id = authStore.user.stripe_seller_id;
      //   commit("SET_LOADER", true, { root: true });
      mainStore.SET_LOADER(true);
      try {
        const getStatus = await API.graphql({
          query: getStripeIdStatus,
          variables: {
            seller_id,
          },
        });
        const parsedData = JSON.parse(getStatus.data.getStripeIdStatus);
        // commit("SET_LOADER", false, { root: true });
        mainStore.SET_LOADER(false);
        return parsedData.body.status;

        // return balanceDetail;
      } catch (err) {
        console.log("Error getStripIdStatus: " + err);
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

    async editTestDescription(payload) {
      const mainStore = useMainStore();
      // const seller_id = rootState.auth.user.stripe_seller_id;
      //   commit("SET_LOADER", true, { root: true });
      mainStore.SET_LOADER(true);
      try {
        const input = {
          id: payload.testId,
          description: payload.testDescription,
        };
        await API.graphql({
          query: updateTestManager,
          variables: { input },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        // commit("updateTestDescription", input, { root: true });
        // commit("SET_LOADER", false, { root: true });
        mainStore.updateTestDescription(input);
        mainStore.SET_LOADER(false);

        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Description updated",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });

        return true;
      } catch (err) {
        console.log("Error editTestDescription: " + err);
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

    async addToCart(state, item) {
      state.cartItems.push(item);
      await Storage.set({
        key: "cartItems",
        value: JSON.stringify(state.cartItems),
      });
    },

    async removeCartItem(state, itemId) {
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      await Storage.set({
        key: "cartItems",
        value: JSON.stringify(state.cartItems),
      });
    },

    async clearCart(state) {
      state.cartItems = [];
      await Storage.set({
        key: "cartItems",
        value: JSON.stringify(state.cartItems),
      });
    },
  },
});
