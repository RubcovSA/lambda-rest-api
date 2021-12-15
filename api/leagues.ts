import { APIGatewayProxyHandler } from 'aws-lambda'
import { leagues } from '../data/data'

export const handler: APIGatewayProxyHandler = async () => {
  const leaguesInfo = leagues.map((l) => {
    return {
      id: l.id,
      name: l.name,
    }
  })

  return {
    statusCode: 200,
    body: JSON.stringify(leaguesInfo, null, 2),
  }
}
