const program = require('commander')
const { createProjectAction } = require('./actions')

const createCommands = () => {
  program
    .command('create <object> [others...]')
    .description('create a new project from remote repository')
    .action(createProjectAction)
}

module.exports = createCommands