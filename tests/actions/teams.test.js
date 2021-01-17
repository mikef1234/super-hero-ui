import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { expect } from 'chai'
import { before, describe, it } from 'mocha'
import { teamsList } from '../mocks/teams'
import { fetchTeams } from '../../actions/teams'

describe('Actions - Teams', () => {
  let mockAxios

  before(() => {
    mockAxios = new MockAdapter(axios)
  })

  describe('fetchTeams', () => {
    it('returns an array of teams from the API', async () => {
      mockAxios.onGet().reply(200, teamsList)

      const data = await fetchTeams()

      expect(data).to.deep.equal(teamsList)
    })

    it('returns an empty array when the API responds with a non-200 status', async () => {
      mockAxios.onGet().reply(500, 'Unable to retrieve teams')

      const data = await fetchTeams()

      expect(data).to.deep.equal([])
    })
  })
})
