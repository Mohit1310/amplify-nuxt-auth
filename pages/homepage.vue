<template>
  <div>
    <h1>homepage</h1>
    <button @click="userLogOut()">Sign out</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";
import { useDashboardStore } from "~/store/dashboard";

const signOut = useAuthStore();
const dashboard = useDashboardStore();
// const userId = "3f85d5ce-b704-497a-911a-2c80d3c3eb9a";
const userId = "ed8604fc-0f58-4b03-964e-80d997e93b90";
console.log(dashboard.getTestData(userId));

const router = useRouter();

const userLogOut = async () => {
  const res = await signOut.logout();
  if (res) {
    router.push("/");
  }
};
</script>

<style lang="scss" scoped></style>
