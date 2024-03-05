import { defineStore } from "pinia";
import { Auth } from "aws-amplify";
import { API } from "aws-amplify";
// import { Storage } from '@capacitor/storage';

import { getUser } from "@/graphql/queries";
import { createUser } from "@/graphql/mutations";
import { useMainStore } from "./store";
// import { useBuyerStore } from "./buyer";
import { useTestManagementStore } from "./testManagement";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null,
    userGroup: null,
    jwtToken: null,
    unconfirmedUserEmail: null,
  }),
  actions: {
    async load(req) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        // const user = await getCurrentUser();
        const jwtToken = user.signInUserSession.accessToken.jwtToken;
        const userRole =
          user.signInUserSession.accessToken.payload["cognito:groups"];
        if (userRole) {
          // commit('setUserGroup', userRole[0]);
          this.setUserGroup(userRole[0]);
        }

        const userGraphql = await API.graphql({
          query: getUser,
          variables: { id: user.attributes.sub },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        let userData = userGraphql.data.getUser;

        // If user signedIn with social account and dont have user in DB
        if (user && !userData) {
          const obj = {
            userId: user.attributes.sub,
            firstName: user.attributes.given_name,
            lastName: user.attributes.family_name,
            email: user.attributes.email,
          };
          // userData = await dispatch("createUser", obj);
          userData = await this.createUser(obj);
        }

        // commit('setUser', userData);
        // commit('setJwtToken', jwtToken);
        this.setUser(userData);
        this.setJwtToken(jwtToken);
        return user;
      } catch (err) {
        console.log("Error load: " + err);
        // commit('setUser', null);
        this.setUser(null);
      }
    },

    async register({ email, rpassword, first_name, last_name }) {
      const username = email;
      console.log("username in auth: " + username);
      const password = rpassword;
      console.log("password: " + password);
      const given_name = first_name;
      const family_name = last_name;
      const mainStore = useMainStore();
      //   commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);
      try {
        // changed from v5 to v6
        const user = await Auth.signUp({
          username,
          password,
          attributes: {
            given_name,
            family_name,
          },
          autoSignIn: {
            // optional - enables auto sign in after user is confirmed
            enabled: true,
          },
        });
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        return user;
      } catch (err) {
        console.log("Error register: " + err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        // this.$swal.fire({
        //   toast: true,
        //   position: "top-end",
        //   icon: "error",
        //   title: err.message,
        //   showConfirmButton: false,
        //   timerProgressBar: true,
        //   timer: 7000,
        // });
      }
    },

    async confirmRegistration({ email, code }) {
      // const mainStore = useMainStore();
      console.log("email in confirm registration: " + email);
      //   commit('SET_LOADER', true, { root: true });
      // mainStore.SET_LOADER(true);

      try {
        console.log("inside try confirmRegistration");
        // changed v5 to v6
        console.log("email in confimRegistration try: " + email);
        await Auth.confirmSignUp(email, code);
        console.log(
          "email in confimRegistration await: " + email + " code: " + code
        );
        // commit('SET_LOADER', false, { root: true });
        // mainStore.SET_LOADER(false);
        return true;
      } catch (err) {
        console.log("Error confirmRegistration: " + err);
        // commit('SET_LOADER', false, { root: true });
        // mainStore.SET_LOADER(false);
        // this.$swal.fire({
        //   toast: true,
        //   position: "top-end",
        //   icon: "error",
        //   title: err.message,
        //   showConfirmButton: false,
        //   timerProgressBar: true,
        //   timer: 7000,
        // });
        return false;
      }
    },

    async resendConfirmationCode(payload) {
      const username = payload;
      console.log("email in resend: ", username);
      const mainStore = useMainStore();
      //   commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        await Auth.resendSignUp(username);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        // this.$swal.fire({
        //   toast: true,
        //   position: "top-end",
        //   icon: "success",
        //   title: "Check your email for the verification code",
        //   showConfirmButton: false,
        //   timerProgressBar: true,
        //   timer: 7000,
        // });
        return true;
      } catch (err) {
        console.log("Error resendConfirmationCode: " + err);
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

    async login({ email, password }) {
      console.log("Email in login: " + email);
      const mainStore = useMainStore();
      //   commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        // window.localStorage.clear();
        console.log("above user" + email);
        const user = await Auth.signIn(email, password);
        console.log("User: " + user);
        const jwtToken = user.signInUserSession.accessToken.jwtToken;

        const userRole =
          user.signInUserSession.accessToken.payload["cognito:groups"];
        if (userRole) {
          //   commit('setUserGroup', userRole[0]);
          this.setUserGroup(userRole[0]);
        }

        const userGraphql = await API.graphql({
          query: getUser,
          variables: { id: user.email },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        let userData = userGraphql.data.getUser;

        // If user signedIn dont have user in DB (This situation comes when user didn't verified and after they tried to login)
        // We dont need this code if we reload page because this code is present in function "load()"
        if (user && !userData) {
          const obj = {
            userId: user.attributes.sub,
            firstName: user.attributes.given_name,
            lastName: user.attributes.family_name,
            email: user.attributes.email,
          };
          //   userData = await dispatch('createUser', obj);
          userData = await this.createUser(obj);
        }

        // commit('setUser', userData);
        // commit('setJwtToken', jwtToken);
        // commit('SET_LOADER', false, { root: true });
        this.setUser(userData);
        this.setJwtToken(jwtToken);
        mainStore.SET_LOADER(false);
        return user;
      } catch (err) {
        console.log("Error login: " + err);
        // commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);

        if (err.name === "UserNotConfirmedException") {
          //   const res = await dispatch('resendConfirmationCode', email);
          const res = await this.resendConfirmationCode(email);
          if (res) {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "warning",
              title:
                "User is not confirmed, We have sent a verification code to your email",
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 10000,
            });

            // commit('setUnconfirmedUserEmail', email);
            this.setUnconfirmedUserEmail(email);
            this.$router.push("/auth/resend-code");
          }
          return false;
        }

        let errMsg = err.message;

        if (err.name === "QuotaExceededError") {
          window.localStorage.clear();
          errMsg = "Please try again later";
        }

        if (
          err.name === "NotAuthorizedException" &&
          err.message === "Unable to login because of security reasons."
        ) {
          errMsg = 'Account blocked. Click on "Forgot password" to unblock';
        }

        // this.$swal.fire({
        //   toast: true,
        //   position: "top-end",
        //   icon: "error",
        //   title: errMsg,
        //   showConfirmButton: false,
        //   timerProgressBar: true,
        //   timer: 10000,
        // });
        return false;
      }
    },

    async logout() {
      const mainStore = useMainStore();
      // const buyerStore = useBuyerStore();
      const testManagement = useTestManagementStore();
      //   commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);

      try {
        await Auth.signOut();
        // commit('setUser', null);
        // commit('buyer/clearCart', false, { root: true });
        // commit('setAllPurchasedTests', [], { root: true });
        // commit('setAllAttemptedTests', [], { root: true });
        // commit('setAllCreatedTests', [], { root: true });
        // commit('testManagement/setRecentlyAddedTests', [], { root: true });
        // commit('testManagement/setFeaturedTests', [], { root: true });
        // commit('setUserGroup', null);
        // commit('SET_LOADER', false, { root: true });
        // this.setUser(null);
        // buyerStore.clearCart(false);
        // mainStore.setAllPurchasedTests([]);
        // mainStore.setAllAttemptedTests([]);
        // mainStore.setAllCreatedTests([]);
        // testManagement.setRecentlyAddedTests([]);
        // testManagement.setFeaturedTests([]);
        // this.setUserGroup(null);
        mainStore.SET_LOADER(false);
        // await Storage.set({
        //   key: "isClickedPopupPublish",
        //   value: JSON.stringify(false),
        // });
        return true;
      } catch (err) {
        console.log("Error logout: " + err);
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

    async createUser(payload) {
      const newUser = {
        id: payload.userId,
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
      };
      const mainStore = useMainStore();

      // commit('SET_LOADER', true, { root: true });
      mainStore.SET_LOADER(true);
      try {
        const userGraphql = await API.graphql({
          query: createUser,
          variables: { input: newUser },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        const userData = userGraphql.data.createUser;
        //   commit('SET_LOADER', false, { root: true });
        mainStore.SET_LOADER(false);
        return userData;
      } catch (err) {
        console.log("Error createUser: " + err);
        //   commit('SET_LOADER', false, { root: true });
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
        return null;
      }
    },

    setUser(user) {
      this.isAuthenticated = !!user;
      this.user = user;
    },

    setJwtToken(jwtToken) {
      this.jwtToken = jwtToken;
    },

    setUserGroup(groupName) {
      this.userGroup = groupName;
    },

    setUnconfirmedUserEmail(unconfirmedUserEmail) {
      this.unconfirmedUserEmail = unconfirmedUserEmail;
    },

    setStripeSeller(stripeSellerId) {
      this.user = {
        ...this.user,
        stripe_seller_id: stripeSellerId,
      };
    },
  },
});
