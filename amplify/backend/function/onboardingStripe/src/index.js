/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STRIPE_PUBLISHABLE_KEY
	STRIPE_SECRET_KEY
	STRIPE_WEBHOOK_SECRET
	DOMAIN_ORIGIN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.handler = async (event) => {
  let statusCode = 200;
  let body;
  function generateAccountLink(accountID, origin) {
    return stripe.accountLinks
      .create({
        type: 'account_onboarding',
        account: accountID,
        refresh_url: `${origin}/?status=failed`,
        return_url: `${origin}/?status=success&account_id=${accountID}`,
      })
      .then((link) => link.url);
  }
  try {
    const account = await stripe.accounts.create({ type: 'express' });
    const origin = process.env.DOMAIN_ORIGIN + '/';
    const accountLinkURL = await generateAccountLink(account.id, origin);
    statusCode = 200;
    body = { message: 'success', account_link: accountLinkURL, account_id: account.id };
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
