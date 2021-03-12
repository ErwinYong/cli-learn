#! /usr/bin/env node

const program = require('commander')
const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')

// 帮助和可选信息
helpOptions()

// 创建命令
createCommands()

// 查看版本号
program.version(require('./package.json').version).parse(process.argv)
