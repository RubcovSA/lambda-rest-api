import { APIGatewayProxyHandler } from 'aws-lambda'
import { leagues } from '../data/data'

export const handler: APIGatewayProxyHandler = async (event) => {
  if (!event.pathParameters?.league_id || !event.pathParameters?.team_id) {
    return {
      statusCode: 400,
      body: 'Bad Request',
    }
  }

  const { league_id, team_id } = event.pathParameters
  const team_id_decoded = decodeURIComponent(team_id)
  const league = leagues.find((l) => l.id === league_id)

  if (!league) {
    return {
      statusCode: 404,
      body: 'Not Found',
    }
  }

  const teamMatches = league.rounds
    .map((r) => {
      return r.matches.filter((m) => {
        return m.team1 === team_id_decoded || m.team2 === team_id_decoded
      })
    })
    .flat()

  return {
    statusCode: 200,
    body: JSON.stringify(teamMatches, null, 2),
  }
}
