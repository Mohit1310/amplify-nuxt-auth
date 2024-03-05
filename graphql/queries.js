/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onboardingStripe = /* GraphQL */ `
  query OnboardingStripe {
    onboardingStripe
  }
`;
export const getBalance = /* GraphQL */ `
  query GetBalance($seller_id: String!) {
    getBalance(seller_id: $seller_id)
  }
`;
export const redirectPayoutDashboard = /* GraphQL */ `
  query RedirectPayoutDashboard($seller_id: String!) {
    redirectPayoutDashboard(seller_id: $seller_id)
  }
`;
export const getStripeIdStatus = /* GraphQL */ `
  query GetStripeIdStatus($seller_id: String!) {
    getStripeIdStatus(seller_id: $seller_id)
  }
`;
export const checkPromoCode = /* GraphQL */ `
  query CheckPromoCode($promocode: String!, $jwt_token: String!) {
    checkPromoCode(promocode: $promocode, jwt_token: $jwt_token)
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      first_name
      last_name
      email
      user_agreement
      stripe_seller_id
      created_tests {
        nextToken
        __typename
      }
      purchased_tests {
        nextToken
        __typename
      }
      attempted_tests {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        first_name
        last_name
        email
        user_agreement
        stripe_seller_id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTestManager = /* GraphQL */ `
  query GetTestManager($id: ID!) {
    getTestManager(id: $id) {
      id
      user_id
      created_by {
        id
        first_name
        last_name
        email
        user_agreement
        stripe_seller_id
        createdAt
        updatedAt
        __typename
      }
      category_id
      sub_category_id
      category {
        id
        name
        image
        slug
        createdAt
        updatedAt
        __typename
      }
      title
      description
      reject_description
      credit
      blog_link
      price
      status
      tags
      time_limit
      questions {
        nextToken
        __typename
      }
      slug
      feedback {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTestManagers = /* GraphQL */ `
  query ListTestManagers($filter: ModelTestManagerFilterInput, $limit: Int, $nextToken: String) {
    listTestManagers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        category_id
        sub_category_id
        title
        description
        reject_description
        credit
        blog_link
        price
        status
        tags
        time_limit
        slug
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listTestsByStatus = /* GraphQL */ `
  query ListTestsByStatus(
    $status: TestManagerStatus!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTestManagerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestsByStatus(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        category_id
        sub_category_id
        title
        description
        reject_description
        credit
        blog_link
        price
        status
        tags
        time_limit
        slug
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchTestManagers = /* GraphQL */ `
  query SearchTestManagers(
    $filter: SearchableTestManagerFilterInput
    $sort: [SearchableTestManagerSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableTestManagerAggregationInput]
  ) {
    searchTestManagers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        user_id
        category_id
        sub_category_id
        title
        description
        reject_description
        credit
        blog_link
        price
        status
        tags
        time_limit
        slug
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      marks
      test_id
      test {
        id
        user_id
        category_id
        sub_category_id
        title
        description
        reject_description
        credit
        blog_link
        price
        status
        tags
        time_limit
        slug
        createdAt
        updatedAt
        __typename
      }
      question
      answer
      explainantion
      options
      is_showcase
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions($filter: ModelQuestionFilterInput, $limit: Int, $nextToken: String) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        marks
        test_id
        question
        answer
        explainantion
        options
        is_showcase
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      image
      slug
      sub_category {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories($filter: ModelCategoryFilterInput, $limit: Int, $nextToken: String) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        slug
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchCategories = /* GraphQL */ `
  query SearchCategories(
    $filter: SearchableCategoryFilterInput
    $sort: [SearchableCategorySortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCategoryAggregationInput]
  ) {
    searchCategories(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        image
        slug
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getSubCategory = /* GraphQL */ `
  query GetSubCategory($id: ID!) {
    getSubCategory(id: $id) {
      id
      name
      category_id
      image
      slug
      category {
        id
        name
        image
        slug
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSubCategories = /* GraphQL */ `
  query ListSubCategories($filter: ModelSubCategoryFilterInput, $limit: Int, $nextToken: String) {
    listSubCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        category_id
        image
        slug
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchSubCategories = /* GraphQL */ `
  query SearchSubCategories(
    $filter: SearchableSubCategoryFilterInput
    $sort: [SearchableSubCategorySortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableSubCategoryAggregationInput]
  ) {
    searchSubCategories(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        category_id
        image
        slug
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getPurchasedTest = /* GraphQL */ `
  query GetPurchasedTest($id: ID!) {
    getPurchasedTest(id: $id) {
      id
      user_id
      test_id
      purchased_by {
        id
        first_name
        last_name
        email
        user_agreement
        stripe_seller_id
        createdAt
        updatedAt
        __typename
      }
      test {
        id
        user_id
        category_id
        sub_category_id
        title
        description
        reject_description
        credit
        blog_link
        price
        status
        tags
        time_limit
        slug
        createdAt
        updatedAt
        __typename
      }
      promocode_id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPurchasedTests = /* GraphQL */ `
  query ListPurchasedTests(
    $filter: ModelPurchasedTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPurchasedTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        test_id
        promocode_id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFeedback = /* GraphQL */ `
  query GetFeedback($id: ID!) {
    getFeedback(id: $id) {
      id
      test_id
      test {
        id
        user_id
        category_id
        sub_category_id
        title
        description
        reject_description
        credit
        blog_link
        price
        status
        tags
        time_limit
        slug
        createdAt
        updatedAt
        __typename
      }
      purchased_id
      purchased_test {
        id
        user_id
        test_id
        promocode_id
        createdAt
        updatedAt
        __typename
      }
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listFeedbacks = /* GraphQL */ `
  query ListFeedbacks($filter: ModelFeedbackFilterInput, $limit: Int, $nextToken: String) {
    listFeedbacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        test_id
        purchased_id
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAttemptedTest = /* GraphQL */ `
  query GetAttemptedTest($id: ID!) {
    getAttemptedTest(id: $id) {
      id
      user_id
      attempted_by {
        id
        first_name
        last_name
        email
        user_agreement
        stripe_seller_id
        createdAt
        updatedAt
        __typename
      }
      test_id
      test {
        id
        user_id
        category_id
        sub_category_id
        title
        description
        reject_description
        credit
        blog_link
        price
        status
        tags
        time_limit
        slug
        createdAt
        updatedAt
        __typename
      }
      status
      remaining_time
      result {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listAttemptedTests = /* GraphQL */ `
  query ListAttemptedTests(
    $filter: ModelAttemptedTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttemptedTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        test_id
        status
        remaining_time
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getResult = /* GraphQL */ `
  query GetResult($id: ID!) {
    getResult(id: $id) {
      id
      attempted_id
      question_id
      question {
        id
        marks
        test_id
        question
        answer
        explainantion
        options
        is_showcase
        createdAt
        updatedAt
        __typename
      }
      user_input
      result_status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listResults = /* GraphQL */ `
  query ListResults($filter: ModelResultFilterInput, $limit: Int, $nextToken: String) {
    listResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        attempted_id
        question_id
        user_input
        result_status
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPromotion = /* GraphQL */ `
  query GetPromotion($id: ID!) {
    getPromotion(id: $id) {
      id
      promotion_code
      discount_percentage
      expiry_date
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPromotions = /* GraphQL */ `
  query ListPromotions($filter: ModelPromotionFilterInput, $limit: Int, $nextToken: String) {
    listPromotions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        promotion_code
        discount_percentage
        expiry_date
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStaticContent = /* GraphQL */ `
  query GetStaticContent($id: ID!) {
    getStaticContent(id: $id) {
      id
      name
      body
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listStaticContents = /* GraphQL */ `
  query ListStaticContents(
    $filter: ModelStaticContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStaticContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        body
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSearchFeedback = /* GraphQL */ `
  query GetSearchFeedback($id: ID!) {
    getSearchFeedback(id: $id) {
      id
      user_email
      description
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSearchFeedbacks = /* GraphQL */ `
  query ListSearchFeedbacks(
    $filter: ModelSearchFeedbackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSearchFeedbacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_email
        description
        status
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
