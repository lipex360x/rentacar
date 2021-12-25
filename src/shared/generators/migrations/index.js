module.exports = {
  description: 'Create a Migration',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select a migration type',
      default: 'TableCreate',
      choices: () => [
        { name: 'Create Table', value: 'TableCreate' },
        { name: 'Add Column', value: 'TableAddColumn' },
        { name: 'Add Foreign Key', value: 'TableForeignKey' },
        { name: 'Drop Column', value: 'TableDropColumn' }
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
        if (type !== 'TableForeignKey') return type
      },
      type: 'list',
      name: 'columnType',
      default: 'varchar',
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
        if (type === 'TableForeignKey') return type
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
        if (type === 'TableForeignKey') return type
      },
      type: 'input',
      name: 'tableColumnReference',
      message: 'Type Table Column Reference Name',
      default: 'id'
    }

  ],

  // prompts: () => {
  //   const prompt = [
  //     {
  //       type: 'list',
  //       name: 'type',
  //       message: 'Select a migration type',
  //       default: 'TableCreate',
  //       choices: () => [
  //         { name: 'Create Table', value: 'TableCreate' },
  //         { name: 'Add Column', value: 'TableAddColumn' },
  //         { name: 'Drop Column', value: 'TableDropColumn' }
  //       ]
  //     },

  //     {
  //       type: 'input',
  //       name: 'name',
  //       message: 'Type migration name:',
  //       validate: (value) => {
  //         if (!value) {
  //           return 'Name is required'
  //         }
  //         return true
  //       }
  //     },

  //     {
  //       type: 'input',
  //       name: 'database',
  //       message: 'Type table name:',
  //       validate: (value) => {
  //         if (!value) {
  //           return 'Table Name is required'
  //         }
  //         return true
  //       }
  //     }
  //   ]
  //   return prompt
  // },

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
