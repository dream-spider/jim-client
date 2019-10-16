const path = require('path')
const dotenv = require('dotenv')

module.exports = {
  resolve: function (dir) {
    return path.join(__dirname, '../', dir)
  },
  /**
   * 约定：
   * 1. 在每个webpack配置的目录下，有名为env的子文件夹
   * 2. .env文件必须以当前NODE_ENV作为后缀，例如：
   *    development环境下的env文件名为：.env.development
   *    production环境下的env文件名为：.env.production
   * @param {} _path 
   */
  loadEnv (_path) {
    const envFilePath = path.resolve(_path, `./env/.env.${process.env.NODE_ENV}`)
    const { parsed, error } = dotenv.config({path: envFilePath})
    if (error) {
      console.error(error)
    } else {
      console.log(`Environment File ${envFilePath} Loaded`)
      return {
        env: parsed,
        envPath: envFilePath
      }
    }
  }
}