/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	AUTH_MOBILEAPPMARKETPLACEE1E8CC85_USERPOOLID
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIIDOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIKEYOUTPUT
	STRIPE_SECRET_KEY
	STRIPE_PUBLISHABLE_KEY
	DOMAIN_ORIGIN
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
    const balance = await stripe.balance.retrieve({
      stripeAccount: sellerId,
    });
    statusCode = 200;
    body = { message: 'success', balance_detail: balance.instant_available };
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
