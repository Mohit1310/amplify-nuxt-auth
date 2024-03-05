import { API } from "aws-amplify";
import { getUser, listUsers } from "~/graphql/queries";
import { listAllTests, userTests } from "~/ManualGraphql/queries";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    testCollection: {},
  }),

  actions: {
    async getTestData(payload) {
      const userId = payload;

      console.log(userId, "user-id");

      try {
        console.log("inside try " + userId);
        const userTestData = await API.graphql({
          query: userTests, // Use the getUser query to fetch the user's data
          variables: { id: userId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        console.log("userTestData: " + userTestData.data.listUsers);
        const testCollection = userTestData?.data?.listUsers?.items;
        this.testCollection = testCollection;
        console.log("testCollection: " + testCollection);

        // commit("setuserData", userTestData.data.getUser);
        console.log("userTestData " + userTestData.data.getUser);
        this.setuserData(userTestData.data.getUser);
        console.log(userTestData.data.getUser);

        // commit("SET_LOADER", false, { root: true });
        return userTestData;
      } catch (err) {
        console.log("Error getTestData: " + err);
        // commit("SET_LOADER", false, { root: true });
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

    setuserData(testCollection) {
      this.testCollection = testCollection;
    },
  },
});
