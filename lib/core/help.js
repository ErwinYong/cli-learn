const program = require('commander')

const helpOptions = () => {
  program.option('-s, --secoo', 'this is a secoo cli')
}

module.exports = helpOptions