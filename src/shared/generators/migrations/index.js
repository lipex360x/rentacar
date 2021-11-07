module.exports = {
  description: 'Create a Migration',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Type migration name:',
      validate: value => {
        if (!value) {
          return 'Name is required'
        }
        return true
      }
    },

    {
      type: 'list',
      name: 'type',
      message: 'Select a migration type',
      default: 'TableCreate',
      choices: () => [
        { name: 'Create Table', value: 'TableCreate' },
        { name: 'Add Column', value: 'TableAddColumn' },
        { name: 'Drop Column', value: 'TableDropColumn' }
      ]
    },

    {
      name: 'timestamp',
      default: new Date().getTime(),
      message: 'Just press enter'
    }
  ],

  actions: data => {
    const migration = 'migration' + data.type

    const actions = [
      {
        type: 'add',
        path: '../../shared/infra/typeorm/migrations/{{timestamp}}-{{pascalCase name}}.ts',
        templateFile: `./migrations/templates/${migration}.hbs`
      }
    ]
    return actions
  }

}
