/* eslint-disable max-len */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {
  afterEach, before, beforeEach, describe, it,
} from 'mocha'
import models from '../../models'
import { postedHero, heroesList, singleHero } from '../mocks/heroes'
import { getAllHeroes, getHeroBySlug, saveNewHero } from '../../controllers/heroes'

chai.use(sinonChai)

describe('Controllers - heroes', () => {
  let sandbox
  let stubbedCreate
  let stubbedFindAll
  let stubbedFindOne
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusSend
  let stubbedStatus

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedCreate = sandbox.stub(models.heroes, 'create')
    stubbedFindAll = sandbox.stub(models.heroes, 'findAll')
    stubbedFindOne = sandbox.stub(models.heroes, 'findOne')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  describe('getAllHeroes', () => {
    it('retrieves a list of heroes from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(heroesList)

      await getAllHeroes({}, response)

      expect(stubbedFindAll).to.have.been.calledWith({ include: [{ model: models.teams }] })
      expect(stubbedSend).to.have.been.calledWith(heroesList)
    })

    it('returns a 500 with an error message when the database call throws an error', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllHeroes({}, response)

      expect(stubbedFindAll).to.have.been.calledWith({ include: [{ model: models.teams }] })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve heroes, please try again')
    })
  })

  describe('getHeroBySlug', () => {
    it('retrieves the hero associated with the provided slug from the database and calls response.send with it', async () => {
      stubbedFindOne.returns(singleHero)
      const request = { params: { slug: 'iron-man' } }

      await getHeroBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: { [models.Op.like]: '%iron-man%' } },
        include: [{ model: models.teams }],
      })
      expect(stubbedSend).to.have.been.calledWith(singleHero)
    })

    it('returns a 404 when no hero is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { slug: 'not-found' } }

      await getHeroBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: { [models.Op.like]: '%not-found%' } },
        include: [{ model: models.teams }],
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 with an error message when the database call throws an error', async () => {
      stubbedFindOne.throws('ERROR!')
      const request = { params: { slug: 'throw-error' } }

      await getHeroBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: { [models.Op.like]: '%throw-error%' } },
        include: [{ model: models.teams }],
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve hero, please try again')
    })
  })

  describe('saveNewHero', () => {
    it('accepts new hero details and saves them as a new hero, returning the saved record with a 201 status', async () => {
      const request = { body: postedHero }
      stubbedCreate.returns(singleHero)

      await saveNewHero(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedHero)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusSend).to.have.been.calledWith(singleHero)
    })

    it('returns a 400 when POST is missing required field', async () => {
      const request = { body: { name: postedHero.name, slug: postedHero.slug } }

      await saveNewHero(request, response)

      expect(stubbedCreate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusSend).to.have.been.calledWith('The following fields are required: name, realname, firstappearance, slug, teamId')
    })

    it('returns a 500 with an error message when the database call throws an error', async () => {
      const request = { body: postedHero }
      stubbedCreate.throws('ERROR')

      await saveNewHero(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedHero)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to save new hero, please try again')
    })
  })
})
