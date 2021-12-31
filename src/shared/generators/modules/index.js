const { textToPascal } = require('../_utils/textTransform')

module.exports = {
  description: 'Create a Module',
  prompts: [
    {
      type: 'input',
      name: 'moduleName',
      message: 'Module Name:',
      default: 'teste',
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
      default: 'testes',
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
      default: 'teste',
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
      default: 'teste',
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
      default: 'create',
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
        name: '{{camelCase moduleName}}.routes.ts',
        template: 'routes.hbs'
      },

      // Entity
      {
        data: {},
        path: '../../modules/{{camelCase moduleName}}/infra/typeorm/entities',
        name: '{{pascalCase entityName}}.entity.ts',
        template: 'entity.hbs'
      },

      // Repository
      {
        data: { pascalTableName },
        path: '../../modules/{{camelCase moduleName}}/infra/typeorm/repositories',
        name: `${pascalTableName}.repository.ts`,
        template: 'repository.hbs'
      },

      /* --------- REPOSITORIES --------- */

      // Fake
      {
        data: { pascalTableName },
        path: '../../modules/{{camelCase moduleName}}/repositories/fakes',
        name: `Fake${pascalTableName}.repository.ts`,
        template: 'fakeRepository.hbs'
      },

      // Interface
      {
        data: { pascalTableName },
        path: '../../modules/{{camelCase moduleName}}/repositories/interfaces',
        name: `I${pascalTableName}.interface.ts`,
        template: 'interfaceRepository.hbs'
      },

      // Container
      {
        data: { pascalTableName },
        path: '../../modules/{{camelCase moduleName}}/repositories/containers',
        name: `${pascalTableName}Repository.container.ts`,
        template: 'container.hbs'
      },

      // Repo Index
      {
        data: { pascalTableName },
        path: '../../modules/{{camelCase moduleName}}/repositories',
        name: 'index.ts',
        template: 'indexContainer.hbs'
      },

      /* --------- USE CASES --------- */

      // Controller
      {
        data: {},
        path: '../../modules/{{camelCase moduleName}}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}',
        name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.controller.ts',
        template: 'controller.hbs'
      },

      // Service
      {
        data: { pascalTableName },
        path: '../../modules/{{camelCase moduleName}}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}',
        name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.service.ts',
        template: 'service.hbs'
      },

      // Tests
      {
        data: { pascalTableName },
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
        data: file.data,
        templateFile: `${pathTemplate}/${file.template}`,
        force: !!file.force
      }

      action.push(createFile)
    })

    // Message
    const message = () => {
      return `Module ${data.moduleName} created`
    }
    action.push(message)

    return action
  }
}
