const Faker = require('faker')

module.exports = {
  description: 'Start Project (Just once)',
  prompts: [
    {
      type: 'input',
      name: 'projectName',
      message: 'Project Name',
      validate: (value) => {
        if (!value) {
          return 'Project Name is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'dbUser',
      message: 'Postgres user name',
      validate: (value) => {
        if (!value) {
          return 'Postgres user name is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'dbPass',
      message: 'Postgres password',
      validate: (value) => {
        if (!value) {
          return 'Postgres password is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'dbTable',
      message: 'Postgres database name',
      validate: (value) => {
        if (!value) {
          return 'Postgres database name is required'
        }
        return true
      }
    }
  ],

  actions: (data) => {
    const action = [
      {
        type: 'add',
        path: '../../../.env',
        data: { jwtToken: Faker.finance.bitcoinAddress(), jwtExpires: '7d' },
        templateFile: './start/templates/env.hbs'
      },

      {
        type: 'add',
        path: '../../../docker-compose.yml',
        templateFile: './start/templates/docker-compose.hbs'
      }

    ]

    return action
  }
}
