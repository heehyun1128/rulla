/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
import dynamoose from "dynamoose";

export const CommentSchema = new dynamoose.Schema(
  {
    commentId: {
      type: String,
    },
    content: String,
    transcriptId: String,
    userId: String,
    selectedTextId: String,
    // "commentImageUrl": { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const CommentModel = dynamoose.model("Comments", CommentSchema);

export const SelectedTextSchema = new dynamoose.Schema(
  {
    selectedTextId: {
      type: String,
      hashKey: true,
    },
    selectedText: String,
    transcriptId: String,
  },
  {
    timestamps: true,
  }
);

const SelectedTextModel = dynamoose.model("SelectedTexts", SelectedTextSchema);

export const lambdaHandler = async (event) => {
  // const { commentId } = event.pathParameters || {};

  const body = event.body ? JSON.parse(event.body) : null;
  if (!body.commentId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing commentId" }),
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",

        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
    };
  }

  try {
    const { commentId } = body;
    // const comment = await CommentModel.get({ commentId });
    // if (!comment) {
    //   return {
    //     statusCode: 404,
    //     body: JSON.stringify({ error: "Comment not found!" }),
    //     headers: {
    //       "Access-Control-Allow-Origin": "http://localhost:3000",

    //       "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
    //       "Access-Control-Allow-Headers":
    //         "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    //     },
    //   };
    // }
    // const { selectedTextId } = comment;

    // if (selectedTextId) {
    //   await SelectedTextModel.delete({ selectedTextId });
    // }
    await CommentModel.delete({ commentId });

    const response = {
      statusCode: 200,

      body: JSON.stringify({ message: "Successfully deleted comment" }),
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",

        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
    };

    return response;
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal server error: ${err}` }),
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",

        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
    };
  }
};
