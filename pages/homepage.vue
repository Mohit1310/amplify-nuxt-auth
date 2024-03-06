<template>
  <div>
    <h1>homepage</h1>
    <button @click="userLogOut()">Sign out</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";
import { useDashboardStore } from "~/store/dashboard";
import { useTestManagementStore } from "~/store/testManagement";
import { useTestStore } from "~/store/userTest";

const signOut = useAuthStore();
const testManagement = useTestManagementStore();
const useTest = useTestStore();
const authStore = useAuthStore();
console.log("useTest: " + useTest.getAllTest(authStore.user.id));
const dashboard = useDashboardStore();
const userId = "ed8604fc-0f58-4b03-964e-80d997e93b90";
// console.log(dashboard.getTestData(userId));
console.log(testManagement.getUserTests());
console.log(testManagement.isUserPendingApprovalTests());

const router = useRouter();

const userLogOut = async () => {
  const res = await signOut.logout();
  if (res) {
    router.push("/");
  }
};
</script>

<style lang="scss" scoped></style>
