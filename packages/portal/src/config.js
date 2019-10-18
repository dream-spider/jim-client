module.exports = {
  authorization: {
    authenticationUrl: process.env.SSO_URL,
    clientId: process.env.SSO_CLIENT_ID,
    indexPage: process.env.SSO_INDEX_PATH
  },
  system: {
    menuRoot: '10'
  }
}