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

const GRAPHQL_ENDPOINT = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT;
// const GRAPHQL_API_KEY = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIIDOUTPUT;
// const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const GRAPHQLAPI_KEY_OUTPUT = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIKEYOUTPUT;

exports.handler = async (event) => {
  const result_id = event.arguments.result_id;

  const getResult = /* GraphQL */ `
    query GetResult($id: ID!) {
      getResult(id: $id) {
        result_status
        user_input
        question {
          answer
        }
      }
    }
  `;

  const updateResult = /* GraphQL */ `
    mutation UpdateResult($input: UpdateResultInput!, $condition: ModelResultConditionInput) {
      updateResult(input: $input, condition: $condition) {
        result_status
      }
    }
  `;

  /** @type {import('node-fetch').RequestInit} */

  let statusCode = 200;
  let body;

  const headers = {
    'x-api-key': GRAPHQLAPI_KEY_OUTPUT,
  };

  try {
    const response = await axios.post(
      GRAPHQL_ENDPOINT,
      {
        query: getResult,
        variables: {
          id: result_id,
        },
      },
      {
        headers,
      },
    );

    const userInputArrTemp = response.data.data.getResult.user_input;
    const answerDataTemp = response.data.data.getResult.question.answer;
    const userInputArr = userInputArrTemp.sort();
    const answerData = answerDataTemp.sort();

    let isCorrect = false;

    for (let i = 0; i < userInputArr.length; i++) {
      const userAnswer = userInputArr[i];
      isCorrect = answerData.includes(userAnswer);
      if (!isCorrect) {
        break;
      }
    }

    const result_status = isCorrect;

    await axios.post(
      GRAPHQL_ENDPOINT,
      {
        query: updateResult,
        variables: {
          input: {
            id: result_id,
            result_status,
          },
        },
      },
      {
        headers,
      },
    );

    statusCode = 200;
    body = {
      message: 'success',
      status: 200,
    };
  } catch (error) {
    statusCode = 500;
    body = {
      message: 'something went wrong',
      status: 500,
    };
    console.log('error', error);
  }

  const returnValue = {
    statusCode,
    body,
  };

  return JSON.stringify(returnValue);
};
