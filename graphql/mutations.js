/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addResultStatus = /* GraphQL */ `
  mutation AddResultStatus($result_id: ID!) {
    addResultStatus(result_id: $result_id)
  }
`;
export const checkoutStripeUrl = /* GraphQL */ `
  mutation CheckoutStripeUrl(
    $test_id: ID!
    $token: String!
    $success_redirect_url: String!
    $cancel_redirect_url: String!
    $promocode: String
  ) {
    checkoutStripeUrl(
      test_id: $test_id
      token: $token
      success_redirect_url: $success_redirect_url
      cancel_redirect_url: $cancel_redirect_url
      promocode: $promocode
    )
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
    deleteUser(input: $input, condition: $condition) {
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
export const createTestManager = /* GraphQL */ `
  mutation CreateTestManager(
    $input: CreateTestManagerInput!
    $condition: ModelTestManagerConditionInput
  ) {
    createTestManager(input: $input, condition: $condition) {
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
export const updateTestManager = /* GraphQL */ `
  mutation UpdateTestManager(
    $input: UpdateTestManagerInput!
    $condition: ModelTestManagerConditionInput
  ) {
    updateTestManager(input: $input, condition: $condition) {
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
export const deleteTestManager = /* GraphQL */ `
  mutation DeleteTestManager(
    $input: DeleteTestManagerInput!
    $condition: ModelTestManagerConditionInput
  ) {
    deleteTestManager(input: $input, condition: $condition) {
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
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion($input: CreateQuestionInput!, $condition: ModelQuestionConditionInput) {
    createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion($input: UpdateQuestionInput!, $condition: ModelQuestionConditionInput) {
    updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion($input: DeleteQuestionInput!, $condition: ModelQuestionConditionInput) {
    deleteQuestion(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory($input: CreateCategoryInput!, $condition: ModelCategoryConditionInput) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory($input: UpdateCategoryInput!, $condition: ModelCategoryConditionInput) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory($input: DeleteCategoryInput!, $condition: ModelCategoryConditionInput) {
    deleteCategory(input: $input, condition: $condition) {
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
export const createSubCategory = /* GraphQL */ `
  mutation CreateSubCategory(
    $input: CreateSubCategoryInput!
    $condition: ModelSubCategoryConditionInput
  ) {
    createSubCategory(input: $input, condition: $condition) {
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
export const updateSubCategory = /* GraphQL */ `
  mutation UpdateSubCategory(
    $input: UpdateSubCategoryInput!
    $condition: ModelSubCategoryConditionInput
  ) {
    updateSubCategory(input: $input, condition: $condition) {
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
export const deleteSubCategory = /* GraphQL */ `
  mutation DeleteSubCategory(
    $input: DeleteSubCategoryInput!
    $condition: ModelSubCategoryConditionInput
  ) {
    deleteSubCategory(input: $input, condition: $condition) {
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
export const createPurchasedTest = /* GraphQL */ `
  mutation CreatePurchasedTest(
    $input: CreatePurchasedTestInput!
    $condition: ModelPurchasedTestConditionInput
  ) {
    createPurchasedTest(input: $input, condition: $condition) {
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
export const updatePurchasedTest = /* GraphQL */ `
  mutation UpdatePurchasedTest(
    $input: UpdatePurchasedTestInput!
    $condition: ModelPurchasedTestConditionInput
  ) {
    updatePurchasedTest(input: $input, condition: $condition) {
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
export const deletePurchasedTest = /* GraphQL */ `
  mutation DeletePurchasedTest(
    $input: DeletePurchasedTestInput!
    $condition: ModelPurchasedTestConditionInput
  ) {
    deletePurchasedTest(input: $input, condition: $condition) {
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
export const createFeedback = /* GraphQL */ `
  mutation CreateFeedback($input: CreateFeedbackInput!, $condition: ModelFeedbackConditionInput) {
    createFeedback(input: $input, condition: $condition) {
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
export const updateFeedback = /* GraphQL */ `
  mutation UpdateFeedback($input: UpdateFeedbackInput!, $condition: ModelFeedbackConditionInput) {
    updateFeedback(input: $input, condition: $condition) {
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
export const deleteFeedback = /* GraphQL */ `
  mutation DeleteFeedback($input: DeleteFeedbackInput!, $condition: ModelFeedbackConditionInput) {
    deleteFeedback(input: $input, condition: $condition) {
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
export const createAttemptedTest = /* GraphQL */ `
  mutation CreateAttemptedTest(
    $input: CreateAttemptedTestInput!
    $condition: ModelAttemptedTestConditionInput
  ) {
    createAttemptedTest(input: $input, condition: $condition) {
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
export const updateAttemptedTest = /* GraphQL */ `
  mutation UpdateAttemptedTest(
    $input: UpdateAttemptedTestInput!
    $condition: ModelAttemptedTestConditionInput
  ) {
    updateAttemptedTest(input: $input, condition: $condition) {
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
export const deleteAttemptedTest = /* GraphQL */ `
  mutation DeleteAttemptedTest(
    $input: DeleteAttemptedTestInput!
    $condition: ModelAttemptedTestConditionInput
  ) {
    deleteAttemptedTest(input: $input, condition: $condition) {
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
export const createResult = /* GraphQL */ `
  mutation CreateResult($input: CreateResultInput!, $condition: ModelResultConditionInput) {
    createResult(input: $input, condition: $condition) {
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
export const updateResult = /* GraphQL */ `
  mutation UpdateResult($input: UpdateResultInput!, $condition: ModelResultConditionInput) {
    updateResult(input: $input, condition: $condition) {
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
export const deleteResult = /* GraphQL */ `
  mutation DeleteResult($input: DeleteResultInput!, $condition: ModelResultConditionInput) {
    deleteResult(input: $input, condition: $condition) {
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
export const createPromotion = /* GraphQL */ `
  mutation CreatePromotion(
    $input: CreatePromotionInput!
    $condition: ModelPromotionConditionInput
  ) {
    createPromotion(input: $input, condition: $condition) {
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
export const updatePromotion = /* GraphQL */ `
  mutation UpdatePromotion(
    $input: UpdatePromotionInput!
    $condition: ModelPromotionConditionInput
  ) {
    updatePromotion(input: $input, condition: $condition) {
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
export const deletePromotion = /* GraphQL */ `
  mutation DeletePromotion(
    $input: DeletePromotionInput!
    $condition: ModelPromotionConditionInput
  ) {
    deletePromotion(input: $input, condition: $condition) {
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
export const createStaticContent = /* GraphQL */ `
  mutation CreateStaticContent(
    $input: CreateStaticContentInput!
    $condition: ModelStaticContentConditionInput
  ) {
    createStaticContent(input: $input, condition: $condition) {
      id
      name
      body
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateStaticContent = /* GraphQL */ `
  mutation UpdateStaticContent(
    $input: UpdateStaticContentInput!
    $condition: ModelStaticContentConditionInput
  ) {
    updateStaticContent(input: $input, condition: $condition) {
      id
      name
      body
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteStaticContent = /* GraphQL */ `
  mutation DeleteStaticContent(
    $input: DeleteStaticContentInput!
    $condition: ModelStaticContentConditionInput
  ) {
    deleteStaticContent(input: $input, condition: $condition) {
      id
      name
      body
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createSearchFeedback = /* GraphQL */ `
  mutation CreateSearchFeedback(
    $input: CreateSearchFeedbackInput!
    $condition: ModelSearchFeedbackConditionInput
  ) {
    createSearchFeedback(input: $input, condition: $condition) {
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
export const updateSearchFeedback = /* GraphQL */ `
  mutation UpdateSearchFeedback(
    $input: UpdateSearchFeedbackInput!
    $condition: ModelSearchFeedbackConditionInput
  ) {
    updateSearchFeedback(input: $input, condition: $condition) {
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
export const deleteSearchFeedback = /* GraphQL */ `
  mutation DeleteSearchFeedback(
    $input: DeleteSearchFeedbackInput!
    $condition: ModelSearchFeedbackConditionInput
  ) {
    deleteSearchFeedback(input: $input, condition: $condition) {
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
