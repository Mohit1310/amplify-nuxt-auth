import { generateClient } from "aws-amplify/api";
import { listTestManagers } from "~/graphql/queries";
import { listAllTests } from "~/ManualGraphql/queries";
import { useMainStore } from "./store";

export const useTestStore = defineStore("useTest", {
  state: () => ({
    allTest: [],
  }),
  actions: {
    async getAllTest(payload) {
      const mainStore = useMainStore();
      const client = generateClient();
      const userId = payload;

      // commit("SET_LOADER", true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        const filter = {
          user_id: { eq: userId },
          and: { status: { eq: "APPROVED" } },
        };

        const allTestData = await client.graphql({
          query: listAllTests,
          variables: { filter: filter, limit: 10000 },
          // authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
        const allTest = allTestData.data.listTestManagers.items;
        // commit("setAllTest", allTest);
        // commit("SET_LOADER", false, { root: true });
        this.setAllTest(allTest);
        mainStore.SET_LOADER(false);

        return allTest;
      } catch (err) {
        console.log("error in the line 20", err);
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

    setAllTest(payload) {
      this.allTest = payload.allTest;
    },
  },
});
