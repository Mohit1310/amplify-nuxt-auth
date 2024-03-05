export const getUserPendingApprovalTests = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      created_tests(filter: { status: { eq: PENDING_APPROVAL } }) {
        items {
          id
          slug
        }
      }
    }
  }
`;

export const userTests = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      purchased_tests {
        items {
          id
          createdAt
          test {
            title
            slug
            time_limit
            id
            category_id
            price
            description
            credit
            blog_link
            category {
              id
              slug
              name
            }
            questions(limit: 10000) {
              items {
                id
                marks
                options
                question
                createdAt
              }
            }
            created_by {
              first_name
              last_name
              id
            }
          }
        }
      }
      attempted_tests {
        items {
          id
          status
          test_id
          remaining_time
          createdAt
          updatedAt
          test {
            id
            price
            title
            slug
            time_limit
            description
            credit
            blog_link
            category {
              id
              slug
              name
            }
            questions(limit: 10000) {
              items {
                id
                marks
                options
                question
                answer
              }
            }
            created_by {
              first_name
              id
              last_name
            }
          }
          result {
            items {
              id
              question_id
              result_status
              user_input
              question {
                options
                question
                marks
                answer
                explainantion
              }
            }
          }
        }
      }
      created_tests {
        items {
          title
          slug
          category_id
          description
          reject_description
          credit
          blog_link
          id
          price
          time_limit
          status
          createdAt
          category {
            id
            slug
            name
          }
          questions(limit: 10000) {
            items {
              answer
              explainantion
              id
              marks
              options
              question
            }
          }
        }
      }
    }
  }
`;

export const getTestDetail = /* GraphQL */ `
  query GetTestManager($id: ID!) {
    getTestManager(id: $id) {
      id
      user_id
      created_by {
        id
        first_name
        last_name
        email
        createdAt
        updatedAt
      }
      category_id
      category {
        id
        name
        createdAt
        updatedAt
      }
      status
      title
      description
      credit
      blog_link
      price
      time_limit
      createdAt
      updatedAt
      questions(limit: 10000) {
        items {
          marks
        }
      }
    }
  }
`;

export const listAllTests = /* GraphQL */ `
  query ListTestManagers($filter: ModelTestManagerFilterInput, $limit: Int, $nextToken: String) {
    listTestManagers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        category_id
        title
        slug
        description
        credit
        blog_link
        price
        status
        time_limit
        reject_description
        createdAt
        updatedAt
        category {
          id
          slug
          name
        }
        questions(limit: 10000) {
          items {
            answer
            explainantion
            id
            marks
            options
            question
          }
        }
        created_by {
          id
          first_name
          last_name
          email
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;

export const listTestsByStatus = /* GraphQL */ `
  query ListTestsByStatus(
    $status: TestManagerStatus!
    $sortDirection: ModelSortDirection
    $filter: ModelTestManagerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestsByStatus(
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        category_id
        title
        slug
        description
        price
        status
        time_limit
        reject_description
        createdAt
        updatedAt
        category {
          id
          name
        }
        questions(limit: 10000) {
          items {
            answer
            explainantion
            id
            marks
            options
            question
          }
        }
        created_by {
          id
          first_name
          last_name
          email
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;

export const getCategoryDetail = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      sub_category {
        items {
          id
          name
          image
          category_id
        }
      }
    }
  }
`;

export const listCategoriesDetail = /* GraphQL */ `
  query ListCategories($filter: ModelCategoryFilterInput, $limit: Int, $nextToken: String) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        createdAt
        slug
        sub_category {
          items {
            id
            name
            image
            slug
          }
        }
      }
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
        createdAt
        slug
        category {
          id
          name
          slug
        }
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
            }
          }
        }
      }
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
        created_by {
          createdAt
          first_name
          last_name
        }
        questions(limit: 10000) {
          items {
            explainantion
            id
            options
            question
            marks
          }
        }
        category {
          id
          slug
          name
        }
        user_id
        category_id
        sub_category_id
        title
        slug
        description
        reject_description
        credit
        blog_link
        price
        status
        tags
        time_limit
        createdAt
        updatedAt
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
            }
          }
        }
      }
    }
  }
`;

export const getSampleQuestions = /* GraphQL */ `
  query GetTestManager($id: ID!) {
    getTestManager(id: $id) {
      questions(limit: 10000, filter: { is_showcase: { eq: true } }) {
        items {
          question
          options
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const categorySlug = /* GraphQL */ `
  query ListCategories($filter: ModelCategoryFilterInput, $limit: Int, $nextToken: String) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
      }
    }
  }
`;

export const subCategorySlug = /* GraphQL */ `
  query ListSubCategories($filter: ModelSubCategoryFilterInput, $limit: Int, $nextToken: String) {
    listSubCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
      }
    }
  }
`;

export const subCategoryUpdate = /* GraphQL */ `
  query GetSubCategory($id: ID!, $slug: String!) {
    getSubCategory(id: $id) {
      category {
        name
        sub_category(filter: { slug: { eq: $slug } }) {
          items {
            id
            name
            slug
            category {
              name
            }
          }
        }
      }
    }
  }
`;

export const listFeedbacksAdmin = /* GraphQL */ `
  query ListFeedbacks($filter: ModelFeedbackFilterInput, $limit: Int, $nextToken: String) {
    listFeedbacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        test_id
        test {
          slug
        }
        purchased_id
        purchased_test {
          purchased_by {
            first_name
            last_name
          }
        }
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
