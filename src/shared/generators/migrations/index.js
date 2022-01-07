const { pascalCase, camelCase } = require('../_utils/textTransform')
const fs = require('../_utils/fileSystem')

module.exports = {
  description: 'Create a Migration (TypeORM)',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Migration Type',
      choices: () => [
        { name: 'New Table', value: 'tableCreate' },
        { name: 'New FK Table (ManyToMany)', value: 'tableFkCreate' },
        { name: 'Add Column', value: 'columnAdd' },
        { name: 'Add FK Column', value: 'columnFkAdd' },
        { name: 'Drop Column', value: 'columnDrop' }
      ]
    },

    {
      type: 'input',
      name: 'name',
      // default: 'teste',
      message: 'Migration Name:',
      validate: (value) => {
        if (!value) {
          return 'Name is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'tableName',
      default: 'testes',
      message: 'Table Name:',
      validate: (value) => {
        if (!value) {
          return 'Table Name is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'columnName',
      // default: 'teste',
      message: 'Column Name:',
      validate: (value) => {
        if (!value) {
          return 'Column Name is required'
        }
        return true
      }
    },

    {
      when: function (response) {
        const type = response.type
        if (type === 'tableCreate' || type === 'columnAdd') return type
      },
      type: 'list',
      name: 'columnType',
      message: 'Column Type:',
      choices: () => [
        { name: 'varchar', value: 'varchar' },
        { name: 'integer', value: 'integer' },
        { name: 'float', value: 'float' },
        { name: 'uuid', value: 'uuid' },
        { name: 'boolean', value: 'boolean' },
        { name: 'timestamp', value: 'timestamp with time zone' }
      ]
    },

    // ##### Foreign Key #####

    {
      when: function (response) {
        const type = response.type
        if (type === 'tableFkCreate' || type === 'columnFkAdd') return type
      },
      type: 'input',
      name: 'tableReference',
      message: 'Table Reference Name:',
      validate: (value) => {
        if (!value) {
          return 'Name is required'
        }
        return true
      }
    },

    {
      when: function (response) {
        const type = response.type
        if (type === 'tableFkCreate' || type === 'columnFkAdd') return type
      },
      type: 'input',
      name: 'tableColumnReference',
      message: 'Table Column Reference Name:',
      default: 'id'
    },

    // ##### Create Module #####
    {
      when: function (response) {
        const type = response.type
        if (type === 'tableCreate') return type
      },
      type: 'confirm',
      name: 'createModule',
      message: 'Generate a Module?',
      default: false
    },

    {
      when: function (response) {
        const type = response.type
        if (type === 'tableCreate' && response.createModule) return type
      },
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
      when: function (response) {
        const type = response.type
        if (type === 'tableCreate' && response.createModule) return type
      },
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
      type: 'confirm',
      name: 'createUseCase',
      message: 'Generate UseCase?',
      default: false
    },

    {
      when: function (response) {
        const type = response.type
        if (type === 'tableCreate' && response.createModule && response.createUseCase) return type
      },
      type: 'input',
      name: 'useCaseName',
      message: 'UseCase Name',
      // default: 'teste',
      // // default: 'teste',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    },

    {
      when: function (response) {
        const type = response.type
        if (type === 'tableCreate' && response.createModule && response.createUseCase) return type
      },
      type: 'input',
      name: 'actionName',
      message: 'Action Name',
      // default: 'teste',
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
    const pascalTableName = pascalCase(data.tableName)
    const pathTemplate = './modules/typeorm/templates'

    const files = () => {
      const arrayFiles = []

      // Migration
      arrayFiles.push({
        path: '../../shared/infra/typeorm/migrations',
        name: '{{timestamp}}-{{pascalCase name}}.ts',
        data: { timestamp: new Date().getTime() },
        template: `./migrations/templates/${data.type}.hbs`
      })

      if (data.type === 'tableCreate' && data.createModule) {
        // Routes
        arrayFiles.push({
          data: {},
          path: '../../modules/{{camelCase moduleName}}/infra/routes',
          name: '{{camelCase useCaseName}}.routes.ts',
          template: `${pathTemplate}/routes.hbs`,
          force: false
        })

        // Entity
        arrayFiles.push({
          data: {},
          path: '../../modules/{{camelCase moduleName}}/infra/typeorm/entities',
          name: '{{pascalCase entityName}}.entity.ts',
          template: `${pathTemplate}/entity.hbs`,
          force: false
        })

        // Repository
        arrayFiles.push({
          data: { pascalTableName },
          path: '../../modules/{{camelCase moduleName}}/infra/typeorm/repositories',
          name: `${pascalTableName}.repository.ts`,
          template: `${pathTemplate}/repository.hbs`,
          force: false
        })

        // FakeRepository
        arrayFiles.push({
          data: { pascalTableName },
          path: '../../modules/{{camelCase moduleName}}/repositories/fakes',
          name: `Fake${pascalTableName}.repository.ts`,
          template: `${pathTemplate}/fakeRepository.hbs`,
          force: false
        })

        // Interface
        arrayFiles.push({
          data: { pascalTableName },
          path: '../../modules/{{camelCase moduleName}}/repositories/interfaces',
          name: `I${pascalTableName}.interface.ts`,
          template: `${pathTemplate}/interfaceRepository.hbs`,
          force: false
        })

        // Container
        arrayFiles.push({
          data: { pascalTableName },
          path: '../../modules/{{camelCase moduleName}}/repositories/containers',
          name: `${pascalTableName}.container.ts`,
          template: `${pathTemplate}/container.hbs`,
          force: false
        })

        if (data.createUseCase) {
        // Controller
          arrayFiles.push({
            data: {},
            path: '../../modules/{{camelCase moduleName}}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}',
            name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.controller.ts',
            template: `${pathTemplate}/controller.hbs`,
            force: false
          })

          // Service
          arrayFiles.push({
            data: { pascalTableName },
            path: '../../modules/{{camelCase moduleName}}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}',
            name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.service.ts',
            template: `${pathTemplate}/service.hbs`,
            force: false
          })

          // Tests
          arrayFiles.push({
            data: { pascalTableName },
            path: '../../modules/{{camelCase moduleName}}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}',
            name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.spec.ts',
            template: `${pathTemplate}/service.spec.hbs`,
            force: false
          })
        }

        // Repository Index
        const moduleName = camelCase(data.moduleName)
        const repositoryFolder = fs(`./src/modules/${moduleName}/repositories/`, 'folder')
        const repositoryIndex = fs(`./src/modules/${moduleName}/repositories/`, 'file')

        if (repositoryFolder.length === 0 || repositoryIndex.length === 0) {
          arrayFiles.push({
            data: { pascalTableName },
            path: '../../modules/{{camelCase moduleName}}/repositories',
            name: 'index.ts',
            template: `${pathTemplate}/indexContainer.hbs`,
            force: false
          })
        }
      }

      return arrayFiles
    }

    // Create Files
    const action = []

    files().forEach(file => {
      const createFile = {
        type: 'add',
        path: `${file.path}/${file.name}`,
        data: file.data,
        templateFile: file.template,
        force: !!file.force
        // force: true
      }

      action.push(createFile)
    })

    // Message
    const message = () => `Migration ${data.name} created`
    action.push(message)

    return action
  }

}
