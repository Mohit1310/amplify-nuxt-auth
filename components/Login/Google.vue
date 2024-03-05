<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

const user = ref(null);
const customState = ref(null);

const signIn = () => {
  Auth.federatedSignIn();
};

const signInWithProvider = (provider) => {
  Auth.federatedSignIn({ provider });
};

const signOut = () => {
  Auth.signOut();
};

const handleAuthEvent = ({ payload: { event, data } }) => {
  switch (event) {
    case "signIn":
      user.value = data;
      break;
    case "signOut":
      user.value = null;
      break;
    case "customOAuthState":
      customState.value = data;
      break;
    default:
      break;
  }
};

onMounted(() => {
  const unsubscribe = Hub.listen("auth", handleAuthEvent);

  Auth.currentAuthenticatedUser()
    .then((currentUser) => (user.value = currentUser))
    .catch(() => console.log("Not signed in"));

  return unsubscribe;
});

onUnmounted(() => {
  Hub.remove("auth", handleAuthEvent);
});

// You can catch errors by listening to the signIn-failure event
Hub.listen("auth", (data) => {
  if (data.payload.event === "signIn_failure") {
    // Do something here
  }
});
</script>

<template>
  <div class="App">
    <button @click="signIn">Open Hosted UI</button>
    <button @click="signInWithProvider(CognitoHostedUIIdentityProvider.Google)">
      Open Google
    </button>
    <button @click="signOut">Sign Out</button>
    <div>{{ user && user.getUsername() }}</div>
  </div>
</template>
