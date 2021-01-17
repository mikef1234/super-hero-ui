import axios from 'axios'

// eslint-disable-next-line import/prefer-default-export
export const fetchHeroesForTeam = async (slug) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/teams/${slug}`) // eslint-disable-line no-undef

    return data
  } catch (error) {
    return {}
  }
}
