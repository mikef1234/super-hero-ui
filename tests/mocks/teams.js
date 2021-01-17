const postedTeam = { name: 'X-Men', slug: 'x-men' }

const singleTeam = {
  id: 3,
  name: 'X-Men',
  slug: 'x-men',
  createdAt: '2020-04-27T15:00:33.000Z',
  updatedAt: '2020-04-27T15:00:33.000Z',
  deletedAt: null,
  heroes: [{
    id: 5,
    name: 'Ice Man',
    realname: 'Bobby Drake',
    firstappearance: 'X-Men # 1',
    slug: 'ice-man',
    teamId: 3,
    createdAt: '2020-04-27T15:00:33.000Z',
    updatedAt: '2020-04-27T15:00:33.000Z',
    deletedAt: null,
  }, {
    id: 8,
    name: 'Wolverine',
    realname: 'James Howlett',
    firstappearance: 'The Incredible Hulk #180',
    slug: 'wolverine',
    teamId: 3,
    createdAt: '2020-04-27T15:00:33.000Z',
    updatedAt: '2020-04-27T15:00:33.000Z',
    deletedAt: null,
  }],
}

const teamsList = [{
  id: 1,
  name: 'Avengers',
  slug: 'avengers',
  createdAt: '2020-04-27T15:00:33.000Z',
  updatedAt: '2020-04-27T15:00:33.000Z',
  deletedAt: null,
}, {
  id: 2,
  name: 'Alpha Flight',
  slug: 'alpha-flight',
  createdAt: '2020-04-27T15:00:33.000Z',
  updatedAt: '2020-04-27T15:00:33.000Z',
  deletedAt: null,
}]

const teamsFilteredForAvengers = [{
  id: 1,
  name: 'Avengers',
  slug: 'avengers',
  createdAt: '2020-04-27T15:00:33.000Z',
  updatedAt: '2020-04-27T15:00:33.000Z',
  deletedAt: null,
}]

module.exports = { postedTeam, singleTeam, teamsList, teamsFilteredForAvengers }
