import { APIGatewayProxyHandler } from 'aws-lambda'
import { leagues } from '../data/data'

export const handler: APIGatewayProxyHandler = async (event) => {
  if (!event.pathParameters?.league_id) {
    return {
      statusCode: 400,
      body: 'Bad Request',
    }
  }

  const { league_id } = event.pathParameters

  const league = leagues.find((l) => {
    console.log(l.id, league_id)
    return l.id === league_id
  })

  if (!league) {
    return {
      statusCode: 404,
      body: 'Not Found',
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(league, null, 2),
  }
}
