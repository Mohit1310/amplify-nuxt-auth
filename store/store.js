import { API } from "aws-amplify";
import { listStaticContents } from "~/graphql/queries";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    isLoading: false,
    isLoaderHidden: false,
    selectedTest: null,
    allPurchasedTests: [],
    allAttemptedTests: [],
    allCreatedTests: [],
    isNavbarVisible: false,
    isSideNavbarVisible: false,
    redirectUrl: "",
    platform: "",
    selectBySlug: null,
    termsConditions: null,
    privacyPolicy: null,
    FAQ: null,
    homeScrollerBannerContent: null,
  }),
  actions: {
    setIsNavbarVisible(payload) {
      //   commit("setIsNavbarVisible", payload);
      this.setIsNavbarVisible(payload);
    },

    async getTC_and_PP() {
      try {
        // const client = generateClient();
        // commit("SET_LOADER", true, { root: true });
        this.SET_LOADER(true);
        const staticData = await API.graphql({
          query: listStaticContents,
        });
        const staticDataArray = staticData.data.listStaticContents.items;
        const termsConditions = staticDataArray.find(
          (obj) => obj.name === "TermsConditions"
        );
        const privacyPolicy = staticDataArray.find(
          (obj) => obj.name === "PrivacyPolicy"
        );
        const FAQ = staticDataArray.find((obj) => obj.name === "FAQ");
        const homeScrollerBannerContent = staticDataArray.find(
          (obj) => obj.name === "HomeScrollerBanner"
        );
        if (termsConditions && privacyPolicy && FAQ) {
          //   commit("setTC_and_PP", {
          //     termsConditions: termsConditions.body,
          //     privacyPolicy: privacyPolicy.body,
          //     FAQ: FAQ.body,
          //     homeScrollerBannerContent: homeScrollerBannerContent.body,
          //   });
          this.setTC_and_PP({
            termsConditions: termsConditions.body,
            privacyPolicy: privacyPolicy.body,
            FAQ: FAQ.body,
            homeScrollerBannerContent: homeScrollerBannerContent.body,
          });
        }
        // commit("SET_LOADER", false, { root: true });
        this.SET_LOADER(false);
        return false;
      } catch (err) {
        // commit("SET_LOADER", false, { root: true });
        this.SET_LOADER(false);

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

    SET_LOADER(isLoading) {
      this.isLoading = isLoading;
    },

    setIsLoaderHidden(isLoaderHidden) {
      this.isLoaderHidden = isLoaderHidden;
    },

    setAllPurchasedTests(allPurchasedTests) {
      this.allPurchasedTests = allPurchasedTests;
    },

    setAllAttemptedTests(allAttemptedTests) {
      this.allAttemptedTests = allAttemptedTests;
    },

    setAllCreatedTests(allCreatedTests) {
      this.allCreatedTests = allCreatedTests;
    },

    selectTest(test) {
      this.selectedTest = test;
    },

    setRedirectUrl(params) {
      this.redirectUrl = params;
    },

    clearRedirectUrl(params) {
      this.redirectUrl = "";
    },

    setIsNavbarVisible(params) {
      this.isNavbarVisible = params;
    },

    setIsSideNavbarVisible(params) {
      this.isSideNavbarVisible = params;
    },

    setPlatform(state) {
      state.platform = Capacitor.getPlatform();
    },

    setTC_and_PP(payload) {
      this.termsConditions = payload.termsConditions;
      this.privacyPolicy = payload.privacyPolicy;
      this.FAQ = payload.FAQ;
      this.homeScrollerBannerContent = payload.homeScrollerBannerContent;
    },

    setSelectBySlug(slug) {
      this.selectBySlug = slug;
    },

    updateTestDescription(testDetail) {
      const { id, description } = testDetail;
      this.allCreatedTests = this.allCreatedTests.map((test) => {
        if (test.id === id) {
          return {
            ...test,
            description,
          };
        }
        return test;
      });
    },
  },
});
