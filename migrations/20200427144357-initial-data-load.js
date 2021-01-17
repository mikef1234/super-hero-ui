module.exports = {
  up: async (queryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.bulkInsert('teams', [
      { name: 'Avengers', slug: 'avengers' },
      { name: 'Alpha Flight', slug: 'alpha-flight' },
      { name: 'X-Men', slug: 'x-men' },
    ])

    return queryInterface.bulkInsert('heroes', [{
      name: 'Captain America',
      realname: 'Steve Rogers',
      firstappearance: 'Captain America Comics #1',
      slug: 'captain-america',
      teamId: 1,
    }, {
      name: 'Spider-Man',
      realname: 'Peter Parker',
      firstappearance: 'Amazing Fantasy #15',
      slug: 'spider-man',
      teamId: 1,
    }, {
      name: 'Iron Man',
      realname: 'Tony Stark',
      firstappearance: 'Tales of Suspense #39',
      slug: 'iron-man',
      teamId: 1,
    }, {
      name: 'Thor',
      realname: 'Thor Odinson',
      firstappearance: 'Journey into Mystery #83',
      slug: 'thor',
      teamId: 1,
    }, {
      name: 'Ice Man',
      realname: 'Bobby Drake',
      firstappearance: 'X-Men # 1',
      slug: 'ice-man',
      teamId: 3,
    }, {
      name: 'Northstar',
      realname: 'Jean-Paul Beaubier',
      firstappearance: 'Uncanny X-Men #120',
      slug: 'northstar',
      teamId: 2,
    }, {
      name: 'Aurora',
      realname: 'Jeanne-Marie Beaubier',
      firstappearance: 'Uncanny X-Men #120',
      slug: 'aurora',
      teamId: 2,
    }, {
      name: 'Wolverine',
      realname: 'James Howlett',
      firstappearance: 'The Incredible Hulk #180',
      slug: 'wolverine',
      teamId: 3,
    }])
  },

  down: async (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.bulkDelete('heroes')
    return queryInterface.bulkDelete('teams')
  },
}
