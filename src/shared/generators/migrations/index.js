module.exports = {
  description: 'Create a Migration',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Type migration name:',
      validate: (value) => {
        if (!value) {
          return 'Name is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'database',
      message: 'Type table name:',
      validate: (value) => {
        if (!value) {
          return 'Table Name is required'
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
    }
  ],

  actions: (data) => {
    const migration = `migration${data.type}`

    const actions = [
      {
        type: 'add',
        path: '../../shared/infra/typeorm/migrations/{{timestamp}}-{{pascalCase name}}.ts',
        data: { timestamp: new Date().getTime() },
        templateFile: `./migrations/templates/${migration}.hbs`
      }
    ]
    return actions
  }

}
