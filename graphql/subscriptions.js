/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateTestManager = /* GraphQL */ `
  subscription OnCreateTestManager(
    $filter: ModelSubscriptionTestManagerFilterInput
    $user_id: String
  ) {
    onCreateTestManager(filter: $filter, user_id: $user_id) {
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
export const onUpdateTestManager = /* GraphQL */ `
  subscription OnUpdateTestManager(
    $filter: ModelSubscriptionTestManagerFilterInput
    $user_id: String
  ) {
    onUpdateTestManager(filter: $filter, user_id: $user_id) {
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
export const onDeleteTestManager = /* GraphQL */ `
  subscription OnDeleteTestManager(
    $filter: ModelSubscriptionTestManagerFilterInput
    $user_id: String
  ) {
    onDeleteTestManager(filter: $filter, user_id: $user_id) {
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onCreateQuestion(filter: $filter) {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onUpdateQuestion(filter: $filter) {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onDeleteQuestion(filter: $filter) {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onCreateCategory(filter: $filter) {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onUpdateCategory(filter: $filter) {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onDeleteCategory(filter: $filter) {
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
export const onCreateSubCategory = /* GraphQL */ `
  subscription OnCreateSubCategory($filter: ModelSubscriptionSubCategoryFilterInput) {
    onCreateSubCategory(filter: $filter) {
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
export const onUpdateSubCategory = /* GraphQL */ `
  subscription OnUpdateSubCategory($filter: ModelSubscriptionSubCategoryFilterInput) {
    onUpdateSubCategory(filter: $filter) {
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
export const onDeleteSubCategory = /* GraphQL */ `
  subscription OnDeleteSubCategory($filter: ModelSubscriptionSubCategoryFilterInput) {
    onDeleteSubCategory(filter: $filter) {
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
export const onCreatePurchasedTest = /* GraphQL */ `
  subscription OnCreatePurchasedTest($filter: ModelSubscriptionPurchasedTestFilterInput) {
    onCreatePurchasedTest(filter: $filter) {
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
export const onUpdatePurchasedTest = /* GraphQL */ `
  subscription OnUpdatePurchasedTest($filter: ModelSubscriptionPurchasedTestFilterInput) {
    onUpdatePurchasedTest(filter: $filter) {
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
export const onDeletePurchasedTest = /* GraphQL */ `
  subscription OnDeletePurchasedTest($filter: ModelSubscriptionPurchasedTestFilterInput) {
    onDeletePurchasedTest(filter: $filter) {
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
export const onCreateFeedback = /* GraphQL */ `
  subscription OnCreateFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
    onCreateFeedback(filter: $filter) {
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
export const onUpdateFeedback = /* GraphQL */ `
  subscription OnUpdateFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
    onUpdateFeedback(filter: $filter) {
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
export const onDeleteFeedback = /* GraphQL */ `
  subscription OnDeleteFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
    onDeleteFeedback(filter: $filter) {
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
export const onCreateAttemptedTest = /* GraphQL */ `
  subscription OnCreateAttemptedTest($filter: ModelSubscriptionAttemptedTestFilterInput) {
    onCreateAttemptedTest(filter: $filter) {
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
export const onUpdateAttemptedTest = /* GraphQL */ `
  subscription OnUpdateAttemptedTest($filter: ModelSubscriptionAttemptedTestFilterInput) {
    onUpdateAttemptedTest(filter: $filter) {
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
export const onDeleteAttemptedTest = /* GraphQL */ `
  subscription OnDeleteAttemptedTest($filter: ModelSubscriptionAttemptedTestFilterInput) {
    onDeleteAttemptedTest(filter: $filter) {
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
export const onCreateResult = /* GraphQL */ `
  subscription OnCreateResult($filter: ModelSubscriptionResultFilterInput) {
    onCreateResult(filter: $filter) {
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
export const onUpdateResult = /* GraphQL */ `
  subscription OnUpdateResult($filter: ModelSubscriptionResultFilterInput) {
    onUpdateResult(filter: $filter) {
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
export const onDeleteResult = /* GraphQL */ `
  subscription OnDeleteResult($filter: ModelSubscriptionResultFilterInput) {
    onDeleteResult(filter: $filter) {
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
export const onCreatePromotion = /* GraphQL */ `
  subscription OnCreatePromotion($filter: ModelSubscriptionPromotionFilterInput) {
    onCreatePromotion(filter: $filter) {
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
export const onUpdatePromotion = /* GraphQL */ `
  subscription OnUpdatePromotion($filter: ModelSubscriptionPromotionFilterInput) {
    onUpdatePromotion(filter: $filter) {
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
export const onDeletePromotion = /* GraphQL */ `
  subscription OnDeletePromotion($filter: ModelSubscriptionPromotionFilterInput) {
    onDeletePromotion(filter: $filter) {
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
export const onCreateStaticContent = /* GraphQL */ `
  subscription OnCreateStaticContent($filter: ModelSubscriptionStaticContentFilterInput) {
    onCreateStaticContent(filter: $filter) {
      id
      name
      body
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateStaticContent = /* GraphQL */ `
  subscription OnUpdateStaticContent($filter: ModelSubscriptionStaticContentFilterInput) {
    onUpdateStaticContent(filter: $filter) {
      id
      name
      body
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteStaticContent = /* GraphQL */ `
  subscription OnDeleteStaticContent($filter: ModelSubscriptionStaticContentFilterInput) {
    onDeleteStaticContent(filter: $filter) {
      id
      name
      body
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSearchFeedback = /* GraphQL */ `
  subscription OnCreateSearchFeedback($filter: ModelSubscriptionSearchFeedbackFilterInput) {
    onCreateSearchFeedback(filter: $filter) {
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
export const onUpdateSearchFeedback = /* GraphQL */ `
  subscription OnUpdateSearchFeedback($filter: ModelSubscriptionSearchFeedbackFilterInput) {
    onUpdateSearchFeedback(filter: $filter) {
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
export const onDeleteSearchFeedback = /* GraphQL */ `
  subscription OnDeleteSearchFeedback($filter: ModelSubscriptionSearchFeedbackFilterInput) {
    onDeleteSearchFeedback(filter: $filter) {
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
