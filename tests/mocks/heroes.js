const heroesList = [{
  id: 1,
  name: 'Captain America',
  realname: 'Steve Rogers',
  firstappearance: 'Captain America Comics #1',
  slug: 'captain-america',
  teamId: 1,
  createdAt: '2020-04-27T15:00:33.000Z',
  updatedAt: '2020-04-27T15:00:33.000Z',
  deletedAt: null,
  team: {
    id: 1,
    name: 'Avengers',
    slug: 'avengers',
    createdAt: '2020-04-27T15:00:33.000Z',
    updatedAt: '2020-04-27T15:00:33.000Z',
    deletedAt: null,
  },
}, {
  id: 2,
  name: 'Spider-Man',
  realname: 'Peter Parker',
  firstappearance: 'Amazing Fantasy #15',
  slug: 'spider-man',
  teamId: 1,
  createdAt: '2020-04-27T15:00:33.000Z',
  updatedAt: '2020-04-27T15:00:33.000Z',
  deletedAt: null,
  team: {
    id: 1,
    name: 'Avengers',
    slug: 'avengers',
    createdAt: '2020-04-27T15:00:33.000Z',
    updatedAt: '2020-04-27T15:00:33.000Z',
    deletedAt: null,
  },
}]

const postedHero = {
  name: 'Captain America',
  realname: 'Steve Rogers',
  firstappearance: 'Captain America Comics #1',
  slug: 'captain-america',
  teamId: 1,
}

const singleHero = {
  id: 1,
  name: 'Captain America',
  realname: 'Steve Rogers',
  firstappearance: 'Captain America Comics #1',
  slug: 'captain-america',
  teamId: 1,
  createdAt: '2020-04-27T15:00:33.000Z',
  updatedAt: '2020-04-27T15:00:33.000Z',
  deletedAt: null,
  team: {
    id: 1,
    name: 'Avengers',
    slug: 'avengers',
    createdAt: '2020-04-27T15:00:33.000Z',
    updatedAt: '2020-04-27T15:00:33.000Z',
    deletedAt: null,
  },
}

module.exports = { postedHero, heroesList, singleHero }
