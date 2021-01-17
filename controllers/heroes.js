import models from '../models'

export const getAllHeroes = async (request, response) => {
  try {
    const heroes = await models.heroes.findAll({ include: [{ model: models.teams }] })

    return response.send(heroes)
  } catch (error) {
    return response.status(500).send('Unable to retrieve heroes, please try again')
  }
}

export const getHeroBySlug = async (request, response) => {
  try {
    const { slug } = request.params

    const foundHero = await models.heroes.findOne({
      where: { slug: { [models.Op.like]: `%${slug}%` } },
      include: [{ model: models.teams }],
    })

    return foundHero
      ? response.send(foundHero)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to retrieve hero, please try again')
  }
}

export const saveNewHero = async (request, response) => {
  try {
    const {
      name, realname, firstappearance, slug, teamId,
    } = request.body

    if (!name || !realname || !firstappearance || !slug || !teamId) {
      return response
        .status(400)
        .send('The following fields are required: name, realname, firstappearance, slug, teamId')
    }

    const newHero = await models.heroes.create({
      name, realname, firstappearance, slug, teamId,
    })

    return response.status(201).send(newHero)
  } catch (error) {
    return response.status(500).send('Unable to save new hero, please try again')
  }
}
