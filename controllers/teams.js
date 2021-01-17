import models from '../models'

export const getAllTeams = async (request, response) => {
  try {
    const teams = await models.teams.findAll()

    return response.send(teams)
  } catch (error) {
    return response.status(500).send('Unable to retrieve teams, please try again')
  }
}

export const getTeamBySlug = async (request, response) => {
  try {
    const { slug } = request.params

    const foundTeam = await models.teams.findOne({
      where: { slug: { [models.Op.like]: `%${slug}%` } },
      include: [{ model: models.heroes }],
    })

    return foundTeam
      ? response.send(foundTeam)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to retrieve team, please try again')
  }
}

export const saveNewTeam = async (request, response) => {
  try {
    const { name, slug } = request.body

    if (!name || !slug) return response.status(400).send('The following fields are required: name, slug')

    const newTeam = await models.teams.create({ name, slug })

    return response.status(201).send(newTeam)
  } catch (error) {
    return response.status(500).send('Unable to save new team, please try again')
  }
}
