import leaguesData from './data.json'

export const leagues: ILeague[] = leaguesData

interface ILeague {
  id: string
  name: string
  rounds: IRound[]
}

interface IRound {
  name: string
  matches: IMatch[]
}

interface IMatch {
  date: string
  team1: string
  team2: string
  score: {
    ft: Array<number>
  }
}
