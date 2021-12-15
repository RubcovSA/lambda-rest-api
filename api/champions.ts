import { APIGatewayProxyHandler } from 'aws-lambda'
import { leagues } from '../data/data'

export const handler: APIGatewayProxyHandler = async () => {
  const champions = leagues.map((l) => {
    const teams = new Map()

    l.rounds
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

    return Array.from(teams)
      .map((t) => {
        return {
          name: t[0],
          score: t[1],
          league: l.name,
        }
      })
      .sort((a, b) => b.score - a.score)[0]
  })

  return {
    statusCode: 200,
    body: JSON.stringify(champions, null, 2),
  }
}
