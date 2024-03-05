<template>
  <form class="form" @submit.prevent="loginLocal">
    <label for="">
      Email
      <input type="text" v-model="form.email" />
    </label>
    <label for="">
      Password
      <input type="password" v-model="form.password" />
    </label>
    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { useMainStore } from "@/store/store";
import { useAuthStore } from "~/store/auth";

const router = useRouter();
const mainStore = useMainStore();
const authStore = useAuthStore();

// const login = authStore.login;
const load = authStore.load;
const isLoading = mainStore.isLoading;
const redirectUrl = mainStore.redirectUrl;
const platform = mainStore.platform;

const form = ref({
  email: "",
  password: "",
});

const loginLocal = async () => {
  const email = form.value.email;
  console.log("Email in async: " + form.value.email);
  console.log("Password in async: " + form.value.password);
  const res = await authStore.login(form.value);
  console.log(res);
  if (res && redirectUrl) {
    console.log("res in if" + res);
    // this.changeBodyStyle();
  } else if (res) {
    console.log("res in else if" + res);
    router.push("/homepage");
  }
};
</script>
