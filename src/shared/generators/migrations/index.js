module.exports = {
  description: 'Create a Migration',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select a migration type',
      default: 'TableCreate',
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
      type: 'input',
      name: 'columnName',
      message: 'Type a Column Name',
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
      message: 'Column Type',
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
      message: 'Type Table Reference Name',
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
      message: 'Type Table Column Reference Name',
      default: 'id'
    }

  ],

  actions: (data) => {
    const files = [
      {
        path: '../../shared/infra/typeorm/migrations',
        name: '{{timestamp}}-{{pascalCase name}}.ts',
        data: { timestamp: new Date().getTime() },
        template: `${data.type}.hbs`
      }
    ]

    // Create Files
    const action = []

    files.forEach(file => {
      const createFile = {
        type: 'add',
        path: `${file.path}/${file.name}`,
        data: file.data,
        templateFile: `./migrations/templates/${file.template}`
      }

      action.push(createFile)
    })

    // Message
    const message = () => {
      return `Migration ${data.name} created`
    }
    action.push(message)

    return action

    // const actions = [
    //   {
    //     type: 'add',
    //     path: '../../shared/infra/typeorm/migrations/{{timestamp}}-{{pascalCase name}}.ts',
    //     data: { timestamp: new Date().getTime() },
    //     templateFile: `./migrations/templates/${migration}.hbs`
    //   }
    // ]
    // return actions
  }

}
