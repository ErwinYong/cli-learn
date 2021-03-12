const { spawn } = require('child_process')

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)
    // 输出子进程文件流信息
    childProcess.stdout.pipe(process.stdout)
    // 输出子进程报错信息
    childProcess.stderr.pipe(process.stderr)
    // 监听close方法（npm模块全部下载完成触发）
    childProcess.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  commandSpawn
}