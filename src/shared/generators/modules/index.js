module.exports = {
  description: 'Generate a Module',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Type the module name:'
    }
  ],
  actions: [

    // INFRA: http
    {
      type: 'add',
      path: '../../modules/{{camelCase name}}/infra/http/controllers/Create{{pascalCase name}}Controller.ts',
      templateFile: './modules/templates/controller.hbs'
    }

    // {
    //   type: 'add',
    //   path: '../../modules/{{camelCase name}}/infra/http/routes/{{camelCase name}}.routes.ts',
    //   templateFile: './modules/templates/routes.hbs'
    // },

    // // INFRA: typeORM
    // {
    //   type: 'add',
    //   path: '../../modules/{{camelCase name}}/infra/typeorm/entities/{{pascalCase name}}.ts',
    //   templateFile: './modules/templates/entities.hbs'
    // },
    // {
    //   type: 'add',
    //   path: '../../modules/{{camelCase name}}/infra/typeorm/repositories/{{pascalCase name}}Repository.ts',
    //   templateFile: './modules/templates/repository.hbs'
    // },

    // // REPOSITORIES
    // {
    //   type: 'add',
    //   path: '../../modules/{{camelCase name}}/repositories/index.ts',
    //   templateFile: './modules/templates/indexContainer.hbs'
    // },
    // {
    //   type: 'add',
    //   path: '../../modules/{{camelCase name}}/repositories/fakes/Fake{{pascalCase name}}Repository.ts',
    //   templateFile: './modules/templates/fakeRepository.hbs'
    // },
    // {
    //   type: 'add',
    //   path: '../../modules/{{camelCase name}}/repositories/interfaces/I{{pascalCase name}}Repository.ts',
    //   templateFile: './modules/templates/interfaceRepository.hbs'
    // },

    // // SERVICES
    // {
    //   type: 'add',
    //   path: '../../modules/{{camelCase name}}/useCases/{{pascalCase name}}/Create/{{pascalCase name}}CreateService.ts',
    //   templateFile: './modules/templates/service.hbs'
    // },
    // {
    //   type: 'add',
    //   path: '../../modules/{{camelCase name}}/useCases/{{pascalCase name}}/Create/{{pascalCase name}}CreateService.spec.ts',
    //   templateFile: './modules/templates/service.spec.hbs'
    // }

  ]
}
