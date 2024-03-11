<template>
  <div>
    <h1>homepage</h1>
    <button @click="userLogOut()">Sign out</button>
  </div>
</template>

<script setup>
import { useAdminStore } from "~/store/admin";
import { useAuthStore } from "~/store/auth";
// import { useBuyerStore } from "~/store/buyer";
// import { useDashboardStore } from "~/store/dashboard";
// import { useSellerStore } from "~/store/seller";
// import { useTestManagementStore } from "~/store/testManagement";
// import { useTestStore } from "~/store/userTest";

const signOut = useAuthStore();
// const testManagement = useTestManagementStore();
// const useTest = useTestStore();
// const authStore = useAuthStore();
// const dashboard = useDashboardStore();
// const buyer = useBuyerStore();
// const seller = useSellerStore();
const admin = useAdminStore();
// const userId = "ed8604fc-0f58-4b03-964e-80d997e93b90";
const payload = {
  userId: "df815ba8-12dd-492a-87a0-9ceed187497d",
  testId: "0bfc21ef-f8b3-46cc-b075-70d3b88f35ad",
  status: "approve",
  rejectDescription: null,
  name: "AWS B 8",
  imageUrl:
    "https://i.pcmag.com/imagery/reviews/02yVL9f8Jw1atwoG6sgFZDH-7..v1569482492.jpg",
  subCat: [
    {
      name: "AWS SB 3",
      imageUrl:
        "https://i.pcmag.com/imagery/reviews/02yVL9f8Jw1atwoG6sgFZDH-7..v1569482492.jpg",
    },
  ],
};

admin.createNewCategory(payload);

const router = useRouter();

const userLogOut = async () => {
  const res = await signOut.logout();
  if (res) {
    router.push("/");
  }
};

onMounted(async () => {
  console.log("going in try");
  try {
    console.log("inside try", adminStore.allTests.length);
    // Fetch categories
    if (!adminStore.allTests.length) {
      console.log("inside alltest when length is not");
      await getAllTests();
    }
    // Once data is fetched, update categories and set loading to false
    allTestsDemo.value = adminStore.allTests;
    console.log("inside the admin all test ", allTestsDemo.value);
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Handle error here (e.g., show error message)
    loading.value = false; // Ensure loading indicator is turned off even in case of error
  }
});
</script>

<style lang="scss" scoped></style>
