import { expect } from 'chai'
import { createSandbox } from 'sinon'
import {
  after, afterEach, before, describe, it,
} from 'mocha'
import { teamsList, teamsFilteredForAvengers } from '../mocks/teams'
import * as TeamsActions from '../../actions/teams'
import { filterTeams, retrieveTeams } from '../../utils/teams'

describe('Utils - Teams', () => {
  let sandbox
  let stubbedFetchTeams

  before(() => {
    sandbox = createSandbox()

    stubbedFetchTeams = sandbox.stub(TeamsActions, 'fetchTeams')
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('filterTeams', () => {
    it('returns an array of matching teams', () => {
      const filtered = filterTeams(teamsList, 'avengers')

      expect(filtered).to.deep.equal(teamsFilteredForAvengers)
    })
  })

  describe('retrieveTeams', () => {
    it('returns the data provided by the fetch action', async () => {
      stubbedFetchTeams.returns(teamsList)

      const data = await retrieveTeams()

      expect(data).to.deep.equal(teamsList)
    })
  })
})
