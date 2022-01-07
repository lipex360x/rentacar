/* eslint-disable */
const { capitalize } = require('../_utils/textTransform')
const get = require('../_utils/fileSystem')

const modules = get('./src/modules', 'folder')

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
      // default: 'teste',
      validate: (value) => {
        if (!value) return 'Name is required'

        return true
      }
    },

    {
      type: 'input',
      name: 'name',
      message: 'Seed Name:',
      // default: 'teste',
      validate: (value) => {
        if (!value) return 'Value is required'

        return true
      }
    }

  ],

  actions: (data) => {
    const files = () => {
      const arrayFiles = []

      arrayFiles.push({
        data: {},
        path: '../../shared/infra/typeorm/seeds',
        name: '{{pascalCase name}}.ts',
        template: 'seed.hbs',
        force: true
      })

      return arrayFiles
    }
    // Create Files
    const action = []

    files().forEach(file => {
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
