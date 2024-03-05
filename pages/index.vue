<template>
  <h1>All Categories</h1>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <ul>
      <li v-for="(category, index) in allCategories" :key="index">
        {{ category.name }}
      </li>
    </ul>
    <!-- <ul>
      <li v-for="(test, index) in allApprovedTests" :key="index">
        {{ test.title }}
      </li>
    </ul> -->
  </div>
  <!-- <LoginGoogle /> -->
  <LoginInner />
  <SignUpInner />
</template>

<script setup>
import { useTestManagementStore } from "@/store/testManagement";

const testManagementStore = useTestManagementStore();
// Use a ref to hold the categories
const allCategories = ref([]);
const getAllCategories = testManagementStore.getAllCategories;
// const allFeaturedTests = ref([]);
// const getAllFeaturedTest = testManagementStore.getAllFeaturedTest;
// const allApprovedTests = ref([]);
// const getAllApprovedTests = testManagementStore.getAllApprovedTests;
// const recentlyAddedTests = ref([]);
// const getRecentlyAddedTests = testManagementStore.getRecentlyAddedTests;

// const allSubCategories = ref([]);
// const categoryId = "418e9d28-c217-4bf2-8293-c868f2626302";
// const getAllSubCategories = testManagementStore.getAllSubCategories(categoryId);

// Use a ref to track the loading state
const loading = ref(true);

// // Call getAllCategories action when the component is mounted
onMounted(async () => {
  // console.log("going in try");
  try {
    // console.log("inside try");
    // Fetch categories
    if (!testManagementStore.categories.length) {
      await getAllCategories();
    }
    // Once data is fetched, update categories and set loading to false
    allCategories.value = testManagementStore.categories;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Handle error here (e.g., show error message)
    loading.value = false; // Ensure loading indicator is turned off even in case of error
  }
});

// onMounted(async () => {
//   try {
//     // Fetch categories
//     if (!testManagementStore.featuredTests.length) {
//       await getAllFeaturedTest();
//     }
//     // Once data is fetched, update categories and set loading to false
//     allFeaturedTests.value = testManagementStore.featuredTests;
//     loading.value = false;
//   } catch (error) {
//     console.error("Error fetching featured tests:", error);
//     // Handle error here (e.g., show error message)
//     loading.value = false; // Ensure loading indicator is turned off even in case of error
//   }
// });

// onMounted(async () => {
//   try {
//     // Fetch categories
//     if (!testManagementStore.allApprovedTests.length) {
//       await getAllApprovedTests();
//     }
//     // Once data is fetched, update categories and set loading to false
//     allApprovedTests.value = testManagementStore.allApprovedTests;
//     loading.value = false;
//   } catch (error) {
//     console.error("Error fetching featured tests:", error);
//     // Handle error here (e.g., show error message)
//     loading.value = false; // Ensure loading indicator is turned off even in case of error
//   }
// });

// onMounted(async () => {
//   try {
//     // Fetch categories
//     if (!testManagementStore.recentlyAddedTests.length) {
//       await getRecentlyAddedTests();
//     }
//     // Once data is fetched, update categories and set loading to false
//     recentlyAddedTests.value = testManagementStore.recentlyAddedTests;
//     loading.value = false;
//   } catch (error) {
//     console.error("Error fetching featured tests:", error);
//     // Handle error here (e.g., show error message)
//     loading.value = false; // Ensure loading indicator is turned off even in case of error
//   }
// });

// // dashboard
// onMounted(async () => {
//   try {
//     const result = await dashboard.getTestData(userId);
//     console.log(result);
//     // rest of your code...
//   } catch (error) {
//     console.error("Error fetching test data:", error);
//     // Handle error here
//   }
// });
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
