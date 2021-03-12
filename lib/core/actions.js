const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const ora = require('ora')
const inquirer = require('inquirer')
const { vuepressRepo, vueTempRepo } = require('../config/vue-repo')
const { commandSpawn } = require('../utils/terminal')

// 封装loading效果
const waitFnLoading = (fn, message) => async (...args) => {
  const spinner = ora(message)
  spinner.start()
  try {
    await fn(...args)
    spinner.succeed()
  } catch (err) {
    spinner.fail('init project failed')
  }
}

// 创建项目方法
const createProjectAction = async (project) => {
  // 1. 拉取远程项目
  await waitFnLoading(download, 'init project')(vuepressRepo, project, { clone: true })
  // 2. 安装npm包
  // 进行向导
  const commandObj = {
    yarn: {
      install: [],
      run: ['docs:dev']
    },
    npm: {
      install: ['install'],
      run: ['run', 'docs:dev']
    }
  }
  const { package } = await inquirer.prompt({
    name: 'package',
    type: 'list',
    message: 'please select a package manage command',
    choices: [
      'yarn',
      'npm'
    ]
  })
  // 系统执行命令兼容
  const command = process.platform === 'win32' ? `${package}.cmd` : package

  await waitFnLoading(commandSpawn, 'download packages')(command, commandObj[package].install, { cwd: `./${project}` })

  // 3. 启动项目
  await commandSpawn(command, commandObj[package].run, { cwd: `./${project}` })
}

module.exports = {
  createProjectAction
}