import JimSDK from './index'

const instance = new window.JimSDK()


instance.init({
  service_url: 'http://60.173.195.121:9906/jim-router',
  id: '384a692f-ca3e-11e9-a0b0-525400b66b12',
  name: '焦庆轩',
  client_id: 'fcb45406-1ab4-4050-8372-52c191de4019',
  heart_beat_rate: 18000,
  log: false,
  on: {
    inited: function (res) {
      console.log(res)
    },
    apply_successfully: function (res) {
      console.log(res)
    },
    apply_failed: function (res) {
      console.log(res)
    },
    socket_successfully: function (res) {
      console.log(res)
    },
    socket_error: function (res) {
      console.log(res)
    },
    socket_message: function (res) {
      console.log(res)
    },
    socket_close: function (res) {
      console.log(res)
    },
    fatal_error: function (res) {
      console.log(res)
    },
  }
}).start()