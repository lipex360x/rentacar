module.exports = {
  description: 'Create a Seed',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Type Seed name:'
    }
  ],
  actions: [
    {
      type: 'add',
      path: '../../shared/infra/typeorm/seeds/{{pascalCase name}}.ts',
      templateFile: './seeds/templates/seed.hbs'
    }
  ]
}
