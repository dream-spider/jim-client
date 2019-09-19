module.exports = {
  service: {
    baseInterfaceUrl: process.env.VUE_APP__BASE_URL
  },
  authorization: {
    authenticationUrl: process.env.VUE_APP__SSO,
    clientId: process.env.VUE_APP_CLIENT_ID,
    indexPage: process.env.VUE_APP__PAGE
  },
  system: {
    menuRoot: '10'
  }
}