import Sequelize from 'sequelize'
import allConfigs from '../config/sequelize'
import heroesModel from './heroes'
import teamsModel from './teams'

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect,
})

const teams = teamsModel(connection, Sequelize)
const heroes = heroesModel(connection, Sequelize, teams)

teams.hasMany(heroes)
heroes.belongsTo(teams)

export default {
  heroes,
  Op: Sequelize.Op,
  teams,
}
