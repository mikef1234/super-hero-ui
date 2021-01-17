/* eslint-disable max-len */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {
  afterEach, before, beforeEach, describe, it,
} from 'mocha'
import models from '../../models'
import { postedTeam, singleTeam, teamsList } from '../mocks/teams'
import { getAllTeams, getTeamBySlug, saveNewTeam } from '../../controllers/teams'

chai.use(sinonChai)

describe('Controllers - teams', () => {
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

    stubbedCreate = sandbox.stub(models.teams, 'create')
    stubbedFindAll = sandbox.stub(models.teams, 'findAll')
    stubbedFindOne = sandbox.stub(models.teams, 'findOne')

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

  describe('getAllTeams', () => {
    it('retrieves a list of heroes from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(teamsList)

      await getAllTeams({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(teamsList)
    })

    it('returns a 500 with an error message when the database call throws an error', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllTeams({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve teams, please try again')
    })
  })

  describe('getTeamBySlug', () => {
    it('retrieves the team associated with the provided slug from the database and calls response.send with it', async () => {
      stubbedFindOne.returns(singleTeam)
      const request = { params: { slug: 'x-men' } }

      await getTeamBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: { [models.Op.like]: '%x-men%' } },
        include: [{ model: models.heroes }],
      })
      expect(stubbedSend).to.have.been.calledWith(singleTeam)
    })

    it('returns a 404 when no team is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { slug: 'not-found' } }

      await getTeamBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: { [models.Op.like]: '%not-found%' } },
        include: [{ model: models.heroes }],
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 with an error message when the database call throws an error', async () => {
      stubbedFindOne.throws('ERROR!')
      const request = { params: { slug: 'throw-error' } }

      await getTeamBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: { [models.Op.like]: '%throw-error%' } },
        include: [{ model: models.heroes }],
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve team, please try again')
    })
  })

  describe('saveNewTeam', () => {
    it('accepts new team details and saves them as a new team, returning the saved record with a 201 status', async () => {
      const request = { body: postedTeam }
      stubbedCreate.returns(singleTeam)

      await saveNewTeam(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedTeam)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusSend).to.have.been.calledWith(singleTeam)
    })

    it('returns a 400 when POST is missing required field', async () => {
      const request = { body: { name: postedTeam.name } }

      await saveNewTeam(request, response)

      expect(stubbedCreate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusSend).to.have.been.calledWith('The following fields are required: name, slug')
    })

    it('returns a 500 with an error message when the database call throws an error', async () => {
      const request = { body: postedTeam }
      stubbedCreate.throws('ERROR')

      await saveNewTeam(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedTeam)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to save new team, please try again')
    })
  })
})
