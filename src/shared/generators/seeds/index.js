const { capitalize } = require('../_utils/textTransform')
const getModules = require('../_utils/getModules')

const modules = getModules('./src/modules')

module.exports = {
  description: 'Create a Seed',
  prompts: [
    {
      type: 'list',
      name: 'moduleName',
      message: 'Select a Module',
      choices: modules
    },

    {
      type: 'input',
      name: 'entity',
      message: 'Entity Name:',
      validate: (value) => {
        if (!value) return 'Name is required'

        return true
      }
    },

    {
      type: 'input',
      name: 'name',
      message: 'Seed Name:',
      validate: (value) => {
        if (!value) return 'Value is required'

        return true
      }
    }

  ],

  actions: (data) => {
    const pathTemplate = './seeds/templates/'

    const files = [
      {
        data: {},
        path: '../../shared/infra/typeorm/seeds',
        name: '{{pascalCase name}}.ts',
        template: 'seed.hbs'
      }
    ]
    // Create Files
    const action = []

    files.forEach(file => {
      const createFile = {
        type: 'add',
        path: `${file.path}/${file.name}`,
        data: file.data,
        templateFile: `${pathTemplate}/${file.template}`,
        force: !!file.force
      }

      action.push(createFile)
    })

    // Message
    const message = () => `Seed ${capitalize(data.name)} created`

    action.push(message)

    return action
  }
}
