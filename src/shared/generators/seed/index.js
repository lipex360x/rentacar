module.exports = {
  description: 'this is a basic plopfile',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Other text'
    }
  ], // array of inquirer prompts
  actions: [
    {
      type: 'add',
      path: 'newFolder/greetings{{name}}.js',
      template: 'Hello {{name}}'
    }
  ] // array of actions
}
