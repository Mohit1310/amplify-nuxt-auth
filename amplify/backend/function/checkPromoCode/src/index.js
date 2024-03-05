/* Amplify Params - DO NOT EDIT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIIDOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIKEYOUTPUT
	AUTH_MOBILEAPPMARKETPLACEE1E8CC85_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const axios = require('axios');
const jwt_decode = require('jwt-decode');
const GRAPHQLAPI_KEY_OUTPUT = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIKEYOUTPUT;
const GRAPHQL_ENDPOINT = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT;
const FREETESTCODE = process.env.FREE_TEST_CODE;

exports.handler = async (event) => {
  const gotPromoCode = event.arguments.promocode;
  const jwtToken = event.arguments.jwt_token;
  const decoded = jwt_decode(jwtToken);
  const customerId = decoded.sub;
  var filter = { promotion_code: { eq: gotPromoCode } };

  //Query Start
  const getAllPromoCodes = /* GraphQL */ `
    query ListPromotions($filter: ModelPromotionFilterInput) {
      listPromotions(filter: $filter) {
        items {
          id
          promotion_code
          discount_percentage
          expiry_date
        }
      }
    }
  `;
  const getPurchasedPromocode = /* GraphQL */ `
    query getPurchasedPromocode($user_id: ID!) {
      listPurchasedTests(filter: { user_id: { eq: $user_id } }) {
        items {
          promocode_id
        }
      }
    }
  `;
  //Query End
  const getUsedPromoCodes = async () => {
    const paramsObj = {
      query: getPurchasedPromocode,
      variables: {
        user_id: customerId,
      },
    };
    const headers = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await axios.post(GRAPHQL_ENDPOINT, paramsObj, headers);
    let arr = response.data.data.listPurchasedTests.items;
    let result = arr.map((a) => a.promocode_id);
    return result;
  };
  const headers = {
    'x-api-key': GRAPHQLAPI_KEY_OUTPUT,
  };
  let statusCode = 200;
  let body;

  try {
    if (FREETESTCODE === gotPromoCode) {
      statusCode = 200;
      body = {
        message: 'success',
        discount_percentage: 100,
        status: 200,
      };
      return JSON.stringify(body);
    }
    const response = await axios.post(
      GRAPHQL_ENDPOINT,
      {
        query: getAllPromoCodes,
        variables: { filter: filter },
      },
      {
        headers,
      },
    );
    let result = response.data.data.listPromotions.items[0];
    const usedPromocodes = await getUsedPromoCodes();
    if (result) {
      if (!usedPromocodes.includes(result.id)) {
        if (new Date(result.expiry_date) > new Date()) {
          statusCode = 200;
          body = {
            message: 'success',
            discount_percentage: result.discount_percentage,
            status: 200,
          };
        } else {
          statusCode = 400;
          body = {
            message: 'Promoode Expired',
            status: 400,
          };
        }
      } else {
        statusCode = 409;
        body = {
          message: 'Promoode already Used',
          status: 409,
        };
      }
    } else {
      statusCode = 404;
      body = {
        message: 'not found',
        status: 404,
      };
    }
  } catch (error) {
    statusCode = 500;
    body = {
      message: 'something went wrong',
      status: 500,
    };
    console.log('error', error);
  }
  return JSON.stringify(body);
};
