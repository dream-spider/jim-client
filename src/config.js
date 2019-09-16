module.exports = {
  deploy: {
    // 'requestBaseUrl': 'http://192.168.128.107:8001/sys-service'
    // requestBaseUrl: 'http://localhost:8080/jim-router'
    requestBaseUrl: 'http://60.173.195.121:9906/jim-router'
  },
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
