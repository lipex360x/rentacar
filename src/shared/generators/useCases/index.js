/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */

const capitalize = require('../_utils/capitalize')

const fs = require('fs')

const getModules = (dir) => fs.readdirSync(dir, {
  withFileTypes: true
}).reduce((a, c) => {
  c.isDirectory() && a.push(c.name)
  return a
}, [])

const modules = getModules('./src/modules')

module.exports = {
  description: 'Generate a useCases',

  prompts: [
    {
      type: 'list',
      name: 'moduleName',
      message: 'Select a Module',
      choices: modules
    },

    {
      type: 'input',
      name: 'useCaseName',
      message: 'UseCase Name',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'actionName',
      message: 'Action Name',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    }

  ],

  actions: (data) => {
    const files = [
      {
        path: '../../modules/{{camelCase moduleName}}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}',
        name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.controller.ts',
        template: 'controller.hbs'
      },

      {
        path: '../../modules/{{camelCase moduleName}}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}',
        name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.service.ts',
        template: 'service.hbs'
      },

      {
        path: '../../modules/{{camelCase moduleName}}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}',
        name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.spec.ts',
        template: 'service.spec.hbs'
      }
    ]
    // Create Files
    const action = []

    files.forEach(file => {
      const createFile = {
        type: 'add',
        path: `${file.path}/${file.name}`,
        templateFile: `./modules/templates/${file.template}`
      }

      action.push(createFile)
    })

    // Message
    const message = () => {
      return `UseCase ${capitalize(data.useCaseName)} created`
    }
    action.push(message)

    return action
  }
}
