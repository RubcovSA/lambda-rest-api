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
    return l.id === league_id
  })

  if (!league) {
    return {
      statusCode: 404,
      body: 'Not Found',
    }
  }

  const teamsSet = new Set()
  league.rounds.forEach((r) => {
    r.matches.forEach((m) => {
      if (!teamsSet.has(m.team1)) {
        teamsSet.add(m.team1)
      }
      if (!teamsSet.has(m.team2)) {
        teamsSet.add(m.team2)
      }
    })
  })

  return {
    statusCode: 200,
    body: JSON.stringify(Array.from(teamsSet).sort(), null, 2),
  }
}
