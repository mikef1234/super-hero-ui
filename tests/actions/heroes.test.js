import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { expect } from 'chai'
import { before, describe, it } from 'mocha'
import singleTeam from '../mocks/teams'
import { fetchHeroesForTeam } from '../../actions/heroes'

describe('Actions - Heroes', () => {
  let mockAxios

  before(() => {
    mockAxios = new MockAdapter(axios)
  })

  describe('fetchHeroesForTeam', () => {
    it('returns the team details and its heroes from the API', async () => {
      mockAxios.onGet().reply(200, singleTeam)

      const data = await fetchHeroesForTeam(1)

      expect(data).to.deep.equal(singleTeam)
    })

    it('returns an empty object when the API returns a non-200 status code', async () => {
      mockAxios.onGet().reply(404, 'Not Found')

      const data = await fetchHeroesForTeam('not-found')

      expect(data).to.deep.equal({})
    })
  })
})
