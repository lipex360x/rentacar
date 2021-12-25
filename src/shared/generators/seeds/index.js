module.exports = {
  description: 'Create a Seed',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Type Seed name:',
      validate: (value) => {
        if (!value) {
          return 'Name is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'category',
      message: 'Category Name',
      validate: (value) => {
        if (!value) {
          return 'category is required'
        }
        return true
      }
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
