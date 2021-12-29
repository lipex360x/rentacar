/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */

// const { capitalize } = require('../_utils/textTransform')

module.exports = {
  description: 'Generate a Middlewares',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Middleware Name',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    }

    // snippet: promptTemplate
  ],

  actions: (data) => {
    const file = {
      name: data.name,
      path: `../../shared/middlewares/${data.name}`
    }

    const action = [
      {
        type: 'add',
        path: `${file.path}/index.ts`,
        data: { file },
        templateFile: './middlewares/templates/index.hbs'
      },

      function (data) {
        return `File ${data.name} created`
      }
    ]
    return action
  }
}
