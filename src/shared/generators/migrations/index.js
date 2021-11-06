module.exports = {
  description: 'Create a Migration',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Type migration name:'
    },

    {
      name: 'timestamp',
      default: new Date().getTime(),
      message: 'Just press enter'
    }
  ],
  actions: [
    {
      type: 'add',
      path: '../../shared/infra/typeorm/migrations/{{timestamp}}-{{pascalCase name}}.ts',
      templateFile: './migrations/templates/migration.hbs'
    }
  ]
}
