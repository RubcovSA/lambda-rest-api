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
  const league = leagues.find((l) => l.id === league_id)

  if (!league) {
    return {
      statusCode: 404,
      body: 'Not Found',
    }
  }
  const teams = new Map()

  league.rounds
    .map((r) => r.matches)
    .flat()
    .forEach((m) => {
      const add = (name, amount) => {
        let goals = 0
        if (teams.has(name)) {
          goals = teams.get(name)
        }
        teams.set(name, goals + amount)
      }
      add(m.team1, m.score.ft[0])
      add(m.team2, m.score.ft[1])
    })

  return {
    statusCode: 200,
    body: JSON.stringify(
      Array.from(teams)
        .map((t) => {
          return {
            name: t[0],
            score: t[1],
          }
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
      null,
      2,
    ),
  }
}
