module.exports = {
  description: 'Create a Module',
  prompts: [
    {
      type: 'input',
      name: 'moduleName',
      message: 'Type module Name:',
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
      // INFRA: Routes
      {
        path: '../../modules/{{camelCase moduleName}}/infra/routes',
        name: '{{camelCase moduleName}}.routes.ts',
        template: 'routes.hbs'
      },

      // INFRA: TypeORM
      {
        path: '../../modules/{{camelCase moduleName}}/infra/typeorm/entities',
        name: '{{pascalCase moduleName}}.ts',
        template: 'entities.hbs'
      },

      {
        path: '../../modules/{{camelCase moduleName}}/infra/typeorm/repositories',
        name: '{{pascalCase moduleName}}Repository.ts',
        template: 'repository.hbs'
      },

      // REPOSITORIES
      {
        path: '../../modules/{{camelCase moduleName}}/repositories',
        name: 'index.ts',
        template: 'indexContainer.hbs'
      },

      {
        path: '../../modules/{{camelCase moduleName}}/repositories/fakes',
        name: 'Fake{{pascalCase moduleName}}Repository.ts',
        template: 'fakeRepository.hbs'
      },

      {
        path: '../../modules/{{camelCase moduleName}}/repositories/interfaces',
        name: 'I{{pascalCase moduleName}}Repository.ts',
        template: 'interfaceRepository.hbs'
      },

      // USECASES
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
      return `Module ${data.moduleName} created`
    }
    action.push(message)

    return action
  }
}
