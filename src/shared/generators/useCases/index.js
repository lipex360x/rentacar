/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */

// const capitalize = require('../_utils/capitalize')

module.exports = {
  description: 'Generate a useCases',
  prompts: [
    {
      type: 'input',
      name: 'moduleName',
      message: 'Module name',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
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
    }
  ],

  actions: (data) => {
    const controller = {
      path: '../../modules/{{camelCase moduleName}}/useCases/{{pascalCase moduleName}}/{{pascalCase useCaseName}}',
      name: '{{pascalCase moduleName}}{{pascalCase useCaseName}}Controller.ts',
    }

    const service = {
      path: '../../modules/{{camelCase moduleName}}/useCases/{{pascalCase moduleName}}/{{pascalCase useCaseName}}',
      name: '{{pascalCase moduleName}}{{pascalCase useCaseName}}Service.ts',
    }

    const test = {
      path: '../../modules/{{camelCase moduleName}}/useCases/{{pascalCase moduleName}}/{{pascalCase useCaseName}}',
      name: '{{pascalCase moduleName}}{{pascalCase useCaseName}}Service.spec.ts',
    }

    const action = [
      {
        type: 'add',
        path: `${controller.path}/${controller.name}`,
        templateFile: './useCases/templates/controller.hbs'
      },

      {
        type: 'add',
        path: `${service.path}/${service.name}`,
        templateFile: './useCases/templates/service.hbs'
      },

      {
        type: 'add',
        path: `${test.path}/${test.name}`,
        templateFile: './useCases/templates/service.spec.hbs'
      },

      function (data) {
        return `useCase ${data.moduleName}/${data.useCaseName} created`
      }
    ]
    return action
  }
}
