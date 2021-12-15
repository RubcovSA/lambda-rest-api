import { APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 500,
    body: 'Not implemented',
  }
}
