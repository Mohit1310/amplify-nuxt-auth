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
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sellerId = event.arguments.seller_id;
  let statusCode = 200;
  let body;
  try {
    const redirectDetail = await stripe.accounts.createLoginLink(sellerId);
    statusCode = 200;
    body = { message: 'success', link: redirectDetail };
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
