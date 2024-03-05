/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	AUTH_MOBILEAPPMARKETPLACEE1E8CC85_USERPOOLID
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIIDOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIKEYOUTPUT
	STRIPE_SECRET_KEY
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const axios = require('axios');
exports.handler = async (event) => {
  let id = event.arguments.seller_id;
  let statusCode = 200;
  let body;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    };
    const result = await axios.get(`https://api.stripe.com/v1/accounts/${id}`, config);
    if (!result.data.details_submitted) {
      statusCode = 500;
      body = { status: 'notActive' };
    } else {
      statusCode = 200;
      body = { status: 'active' };
    }
  } catch (err) {
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
