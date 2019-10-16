const path = require('path')
const dotenv = require('dotenv')

module.exports = {
  resolve: function (dir) {
    return path.join(__dirname, '../', dir)
  },
  loadEnv: function (path) {
    const { parsed, error } = dotenv.config({path})
    if (error) {
      console.error(error)
    } else {
      console.log(`Environment File ${path} Loaded`)
      return parsed
    }
  }
}