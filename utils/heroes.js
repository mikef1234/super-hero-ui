import { fetchHeroesForTeam } from '../actions/heroes'

export const getTeamSlugFromUrl = location => (location && location.pathname && location.pathname.includes('/heroes/')
  ? location.pathname.split('/heroes/').pop()
  : ''
)

export const retrieveHeroes = async (location) => {
  const teamSlug = getTeamSlugFromUrl(location)

  if (!teamSlug) return { details: {}, heroes: [] }

  const { id, name, slug, heroes } = await fetchHeroesForTeam(teamSlug)

  if (!id || !name || !slug || !heroes) return { details: {}, heroes: [] }

  return { heroes, details: { id, name, slug } }
}
