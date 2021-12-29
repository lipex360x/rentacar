const { textToPascal } = require('../_utils/textTransform')

module.exports = {
  description: 'Create a Migration',
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
      message: 'Generate a Basic Module? (without useCase)',
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
      validate: value => {
        if (!value) {
          return 'Name is required'
        }
        return true
      }
    }

  ],

  actions: (data) => {
    let files = [
      {
        path: '../../shared/infra/typeorm/migrations',
        name: '{{timestamp}}-{{pascalCase name}}.ts',
        data: { timestamp: new Date().getTime() },
        template: `./migrations/templates/${data.type}.hbs`
      }
    ]

    const createModule = [
      // INFRA: TypeORM
      {
        path: '../../modules/{{camelCase moduleName}}/infra/typeorm/entities',
        name: '{{pascalCase entityName}}.ts',
        template: './modules/templates/entity.hbs'
      },

      {
        path: '../../modules/{{camelCase moduleName}}/infra/typeorm/repositories',
        data: { pascalName: textToPascal(data.tableName) },
        name: '{{pascalName}}Repository.ts',
        template: './modules/templates/repository.hbs'
      },

      // REPOSITORIES
      {
        path: '../../modules/{{camelCase moduleName}}/repositories',
        name: 'index.ts',
        template: './modules/templates/indexContainer.hbs'
      },

      {
        path: '../../modules/{{camelCase moduleName}}/repositories/fakes',
        data: { pascalName: textToPascal(data.tableName) },
        name: 'Fake{{pascalName}}Repository.ts',
        template: './modules/templates/fakeRepository.hbs',
        force: true
      },

      {
        path: '../../modules/{{camelCase moduleName}}/repositories/interfaces',
        data: { pascalName: textToPascal(data.tableName) },
        name: 'I{{pascalName}}Repository.ts',
        template: './modules/templates/interfaceRepository.hbs',
        force: true
      }
    ]

    if (data.type === 'tableCreate' && data.createModule) files = files.concat(createModule)

    // Create Files
    const action = []

    files.forEach(file => {
      const createFile = {
        type: 'add',
        path: `${file.path}/${file.name}`,
        data: file.data,
        templateFile: file.template,
        force: !!file.force
      }

      action.push(createFile)
    })

    // Message
    const message = () => {
      return `Migration ${data.name} created`
    }
    action.push(message)

    return action
  }

}
