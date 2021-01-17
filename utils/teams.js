import { fetchTeams } from '../actions/teams'

export const filterTeams = (list, term) => list.filter(team => (
  team.slug.toLowerCase().includes(term.toLowerCase())
))

export const retrieveTeams = async () => {
  const teams = await fetchTeams()

  return teams
}
