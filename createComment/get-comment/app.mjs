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
import { corsMiddleware } from './cors.mjs';
import dynamoose from "dynamoose";

export const CommentSchema = new dynamoose.Schema(
  {
    commentId: {
      type: String,
      hashKey: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    selectedText: {
      type: String,
      required: true,
    },
    transcriptId: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const CommentModel = dynamoose.model("Comments", CommentSchema);

const rawHandler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  let commentId;
  try {
    commentId = event.pathParameters?.commentId;
  } catch (error) {
    console.error("Error parsing event path parameters:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request parameters" }),
    };
  }

  if (!commentId) {
    console.error("Missing required parameter: commentId");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required parameter: commentId" }),
    };
  }

  try {
    const comment = await CommentModel.get({ commentId });
    if (!comment) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Comment not found!" }),
      };
    }

    console.log("Comment fetched successfully:", comment);

    const response = {
      statusCode: 200,
      body: JSON.stringify(comment),
    };

    return response;
  } catch (err) {
    console.error("Error fetching comment:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal server error: ${err}` }),
    };
  }
};

export const lambdaHandler = corsMiddleware(rawHandler);