const { textToPascal } = require('../_utils/textTransform')

module.exports = {
  description: 'Create a Module',
  prompts: [
    {
      type: 'input',
      name: 'moduleName',
      message: 'Module Name:',
      // default: 'teste',
      validate: value => {
        if (!value) {
          return 'Name is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'tableName',
      message: 'Table Name:',
      // default: 'testes',
      validate: value => {
        if (!value) {
          return 'Name is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'entityName',
      message: 'Entity Name:',
      // default: 'teste',
      validate: value => {
        if (!value) {
          return 'Name is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'useCaseName',
      message: 'UseCase Name',
      // default: 'teste',
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
      // default: 'create',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    }
  ],

  actions: (data) => {
    const pascalTableName = textToPascal(data.tableName)
    const pathTemplate = './modules/templates'

    const files = [
      /* --------- INFRA --------- */

      // Routes
      {
        data: {},
        path: '../../modules/{{camelCase moduleName}}/infra/routes',
        name: '{{camelCase useCaseName}}.routes.ts',
        template: 'routes.hbs',
        force: true
      },

      // Entity
      {
        data: {},
        path: '../../modules/{{camelCase moduleName}}/infra/typeorm/entities',
        name: '{{pascalCase entityName}}.entity.ts',
        template: 'entity.hbs',
        force: false
      },

      // Repository
      {
        data: { pascalTableName },
        path: '../../modules/{{camelCase moduleName}}/infra/typeorm/repositories',
        name: `${pascalTableName}.repository.ts`,
        template: 'repository.hbs',
        force: false
      },

      /* --------- REPOSITORIES --------- */

      // Fake
      {
        data: { pascalTableName },
        path: '../../modules/{{camelCase moduleName}}/repositories/fakes',
        name: `Fake${pascalTableName}.repository.ts`,
        template: 'fakeRepository.hbs',
        force: false
      },

      // Interface
      {
        data: { pascalTableName },
        path: '../../modules/{{camelCase moduleName}}/repositories/interfaces',
        name: `I${pascalTableName}.interface.ts`,
        template: 'interfaceRepository.hbs',
        force: false
      },

      // Container
      {
        data: { pascalTableName },
        path: '../../modules/{{camelCase moduleName}}/repositories/containers',
        name: `${pascalTableName}Repository.container.ts`,
        template: 'container.hbs',
        force: false
      },

      // Repo Index
      {
        data: { pascalTableName },
        path: '../../modules/{{camelCase moduleName}}/repositories',
        name: 'index.ts',
        template: 'indexContainer.hbs',
        force: false
      },

      /* --------- USE CASES --------- */

      // Controller
      {
        data: {},
        path: '../../modules/{{camelCase moduleName}}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}',
        name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.controller.ts',
        template: 'controller.hbs',
        force: false
      },

      // Service
      {
        data: { pascalTableName },
        path: '../../modules/{{camelCase moduleName}}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}',
        name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.service.ts',
        template: 'service.hbs',
        force: false
      },

      // Tests
      {
        data: { pascalTableName },
        path: '../../modules/{{camelCase moduleName}}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}',
        name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.spec.ts',
        template: 'service.spec.hbs',
        force: false
      }
    ]

    // Create Files
    const action = []

    files.forEach(file => {
      const createFile = {
        type: 'add',
        path: `${file.path}/${file.name}`,
        data: file.data,
        templateFile: `${pathTemplate}/${file.template}`,
        force: !!file.force
      }

      action.push(createFile)
    })

    // Message
    const message = () => `Module ${data.moduleName} created`
    action.push(message)

    return action
  }
}
