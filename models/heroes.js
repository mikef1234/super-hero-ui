export default (connection, Sequelize, Teams) => connection.define('heroes', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING },
  realname: { type: Sequelize.STRING },
  firstappearance: { type: Sequelize.STRING },
  slug: { type: Sequelize.STRING, unique: true },
  teamId: { type: Sequelize.INTEGER, references: { model: Teams, key: 'id' } },
}, { paranoid: true })
