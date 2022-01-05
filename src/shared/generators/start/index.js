const { generateId } = require('../_utils/textTransform')

module.exports = {
  description: 'Start Project (Just once)',
  prompts: [
    {
      type: 'input',
      name: 'projectName',
      message: 'Project Name',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'apiPort',
      message: 'API Port',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
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
          return 'Value is required'
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
          return 'Value is required'
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
          return 'Value is required'
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
        data: {
          jwtToken: generateId(16),
          jwtExpires: '15m',
          refreshToken: generateId(12),
          refreshExpires: '7d',
          projectMail: 'noreply@{{camelCase projectName}}.com'
        },
        templateFile: './start/templates/env.hbs'
      }
    ]

    return action
  }
}
