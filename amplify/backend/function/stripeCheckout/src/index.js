/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	AUTH_MOBILEAPPMARKETPLACEE1E8CC85_USERPOOLID
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIIDOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIKEYOUTPUT
	STRIPE_PUBLISHABLE_KEY
	STRIPE_SECRET_KEY
	DOMAIN_ORIGIN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const axios = require('axios');
const jwt_decode = require('jwt-decode');
const GRAPHQL_ENDPOINT = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQLAPI_KEY_OUTPUT = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIKEYOUTPUT;
const commission_percentage = process.env.COMMISSION_PERCENTAGE;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getTestDetailQuery = /* GraphQL */ `
  query GetTestManager($id: ID!) {
    getTestManager(id: $id) {
      created_by {
        id
        stripe_seller_id
      }
      title
      price
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

const getUserTestQuery = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      purchased_tests {
        items {
          test_id
        }
      }
      created_tests {
        items {
          id
        }
      }
    }
  }
`;

exports.handler = async (event) => {
  let statusCode = 200;
  let body;

  const gotPromoCode = event.arguments.promocode;

  var filter = { promotion_code: { eq: gotPromoCode } };
  const getAllPromoCodes = /* GraphQL */ `
    query ListPromotions($filter: ModelPromotionFilterInput) {
      listPromotions(filter: $filter) {
        items {
          id
          promotion_code
          discount_percentage
        }
      }
    }
  `;

  try {
    const testId = event.arguments.test_id;
    const jwtToken = event.arguments.token;
    const successRedirectUrl = event.arguments.success_redirect_url;
    const cancelRedirectUrl = event.arguments.cancel_redirect_url;
    const decoded = jwt_decode(jwtToken);
    const customerId = decoded.sub;

    const getTestDetail = async (id) => {
      const paramsObj = {
        query: getTestDetailQuery,
        variables: {
          id,
        },
      };
      const headers = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await axios.post(GRAPHQL_ENDPOINT, paramsObj, headers);

      const testRes = response.data.data.getTestManager;
      const detail = {
        title: testRes.title,
        price: testRes.price,
        sellerId: testRes.created_by.stripe_seller_id,
        userId: testRes.created_by.id,
      };
      return detail;
    };

    const creatorPurchased = async () => {
      const paramsObj = {
        query: getUserTestQuery,
        variables: {
          id: customerId,
        },
      };
      const headers = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await axios.post(GRAPHQL_ENDPOINT, paramsObj, headers);
      const createdTests = response.data.data.getUser.created_tests.items;
      let isCreator = false;
      createdTests.forEach((testIdLocal) => {
        if (testIdLocal.id === testId) {
          isCreator = true;
          return;
        }
      });
      let isPurchased = false;
      if (!isCreator) {
        const purchasedTests = response.data.data.getUser.purchased_tests.items;
        purchasedTests.forEach((testIdLocal) => {
          if (testIdLocal.test_id === testId) {
            isPurchased = true;
            return;
          }
        });
      }

      return isCreator || isPurchased;
    };

    const getUsedPromoCodes = async (id) => {
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
    // Start STRIPE
    const stripePayment = async (title, basePrice, sellerId, userId, promocodeId) => {
      const quantity = 1;
      const calculateApplicationFeeAmount = Math.round(
        commission_percentage * basePrice * quantity,
      );
      // const domainURL = process.env.DOMAIN_ORIGIN;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            name: title,
            quantity,
            currency: 'USD',
            amount: basePrice * 100,
            // Keep the amount on the server to prevent customers from manipulating on client
          },
        ],
        metadata: {
          seller_id: userId,
          customer_id: customerId,
          test_id: testId,
          promocode_id: promocodeId,
        },
        payment_intent_data: {
          application_fee_amount: calculateApplicationFeeAmount,
          // The account receiving the funds, as passed from the client.
          transfer_data: {
            destination: sellerId,
          },
        },
        // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
        success_url: `${successRedirectUrl}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${cancelRedirectUrl}/`,
      });

      return session;
    };
    // End STRIPE

    const isCreatorPurchased = await creatorPurchased();

    // START Check Promocode

    const headers = {
      'x-api-key': GRAPHQLAPI_KEY_OUTPUT,
    };

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
    const result = response.data.data.listPromotions.items[0];
    const usedPromocodes = await getUsedPromoCodes();

    //Check If promocode Used or not

    if (!isCreatorPurchased) {
      if (gotPromoCode) {
        if (!usedPromocodes.includes(result.id)) {
          if (result.discount_percentage) {
            const testDetail = await getTestDetail(testId);
            var discount = (testDetail.price * result.discount_percentage) / 100;
            testDetail.price = (testDetail.price - discount).toFixed(2);
            const sessionData = await stripePayment(
              testDetail.title,
              testDetail.price,
              testDetail.sellerId,
              testDetail.userId,
              result.id,
            );
            statusCode = 200;
            body = { message: 'success', url: sessionData.url, session_id: sessionData.id };
          }
        }
      } else if (
        !gotPromoCode ||
        gotPromoCode === undefined ||
        gotPromoCode === '' ||
        gotPromoCode === null
      ) {
        const testDetail = await getTestDetail(testId);
        const sessionData = await stripePayment(
          testDetail.title,
          testDetail.price,
          testDetail.sellerId,
          testDetail.userId,
          '',
        );
        statusCode = 200;
        body = { message: 'success', url: sessionData.url, session_id: sessionData.id };
      }
    } else {
      statusCode = 409;
      body = { message: 'already exist' };
    }

    // End Check Promocode
  } catch (err) {
    console.log('ERROR ->', err);
    statusCode = 500;
    body = {
      message: err,
    };
  }

  const returnValue = {
    statusCode,
    body,
  };

  return JSON.stringify(returnValue);
};
