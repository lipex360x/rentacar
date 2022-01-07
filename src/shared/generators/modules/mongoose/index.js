/* eslint-disable */
const { capitalize } = require('../../_utils/textTransform')

module.exports = {
  description: 'Generate a Mongoose Module',
  prompts: [
    {
      type: 'input',
      name: 'moduleName',
      message: 'Module Name:',
      default: 'teste',
      validate: value => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'tableName',
      message: 'Table Name:',
      default: 'teste',
      validate: value => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'schemaName',
      message: 'Schema Name:',
      default: 'teste',
      validate: value => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    },
  ],

  actions: (data) => {
    const pathTemplate = './modules/mongoose/templates'

    const files = () => {
      const arrayFiles = []

      // Schema
      arrayFiles.push({
        data: {},
        path: '../../../modules/{{camelCase moduleName}}/infra/mongoose/schemas',
        name: '{{pascalCase entityName}}.schema.ts',
        template: 'schema.hbs',
        force: false
      })

      // Repository
      arrayFiles.push({
        data: { pascalTableName },
        path: '../../../modules/{{camelCase moduleName}}/infra/mongoose/repositories',
        name: `${pascalTableName}.repository.ts`,
        template: 'repository.hbs',
        force: false
      })

      // Container
      arrayFiles.push({
        data: { pascalTableName },
        path: '../../../modules/{{camelCase moduleName}}/repositories/containers',
        name: `${pascalTableName}Repository.container.ts`,
        template: 'container.hbs',
        force: false
      })

      // FakeRepository
      arrayFiles.push({
        data: { pascalTableName },
        path: '../../../modules/{{camelCase moduleName}}/repositories/fakes',
        name: `Fake${pascalTableName}.repository.ts`,
        template: 'fakeRepository.hbs',
        force: false
      })

      // Interface
      arrayFiles.push({
        data: { pascalTableName },
        path: '../../../modules/{{camelCase moduleName}}/repositories/interfaces',
        name: `I${pascalTableName}.interface.ts`,
        template: 'interfaceRepository.hbs',
        force: false
      })

      // Repository Index
      arrayFiles.push({
        data: { pascalTableName },
        path: '../../../modules/{{camelCase moduleName}}/repositories',
        name: 'index.ts',
        template: 'indexContainer.hbs',
        force: false
      })

      return arrayFiles      
    }

    // Create Files
    const action = []

    files().forEach(file => {
      const createFile = {
        type: 'add',
        path: `${file.path}/${file.name}`,
        data: file.data,
        templateFile: `${pathTemplate}/${file.template}`,
        // force: !!file.force
        force: true
      }

      action.push(createFile)
    })

    // Message
    const message = () => (`Module ${data.moduleName} created`)
    action.push(message)

    return action
  }
}
