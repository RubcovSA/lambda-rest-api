import leaguesData from './data.json'

export const leagues: League[] = leaguesData

interface League {
  id: string
  name: string
  rounds: Round[]
}

interface Round {
  name: string
  matches: Match[]
}

interface Match {
  date: string
  team1: string
  team2: string
  score: {
    ft: Array<number>
  }
}
