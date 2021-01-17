export default (connection, Sequelize) => connection.define('teams', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING },
  slug: { type: Sequelize.STRING, unique: true },
}, { paranoid: true })
