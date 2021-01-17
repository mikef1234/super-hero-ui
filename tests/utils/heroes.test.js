/* eslint-disable max-len */
import { expect } from 'chai'
import { createSandbox } from 'sinon'
import {
  after, afterEach, before, describe, it,
} from 'mocha'
import * as HeroesActions from '../../actions/heroes'
import { singleTeam } from '../mocks/teams'
import { getTeamSlugFromUrl, retrieveHeroes } from '../../utils/heroes'

describe('Utils - Heroes', () => {
  let sandbox
  let stubbedFetchHeroesForTeam

  before(() => {
    sandbox = createSandbox()

    stubbedFetchHeroesForTeam = sandbox.stub(HeroesActions, 'fetchHeroesForTeam')
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('getTeamSlugFromUrl', () => {
    it('returns the final portion of the URL from the location object provided', () => {
      const slug = getTeamSlugFromUrl({ pathname: '/heroes/x-men' })

      expect(slug).to.equal('x-men')
    })

    it('returns empty string when there is no path name', () => {
      const slug = getTeamSlugFromUrl({})

      expect(slug).to.equal('')
    })
  })

  describe('retrieveHeroes', () => {
    it('returns the manufacturer id, their details, and product list from the API call', async () => {
      stubbedFetchHeroesForTeam.returns(singleTeam)

      const data = await retrieveHeroes({ pathname: '/heroes/x-men' })

      expect(data).to.deep.equal({
        details: { id: 3, name: 'X-Men', slug: 'x-men' },
        heroes: singleTeam.heroes,
      })
    })

    it('returns an empty details object and empty heroes list when the path is not in the format "/heroes/slug"', async () => {
      const data = await retrieveHeroes({ pathname: '/no/slug' })

      expect(data).to.deep.equal({ details: {}, heroes: [] })
    })

    it('returns an empty details object and and heroes list when the action returns bad data', async () => {
      stubbedFetchHeroesForTeam.returns({})

      const data = await retrieveHeroes({ pathname: '/heroes/x-men' })

      expect(data).to.deep.equal({ details: {}, heroes: [] })
    })
  })
})
