import JimSDK from './index'

const instance = new window.JimSDK()


instance.init({
  request_ctx: '/jim-router',
  client_id: 'DB3DCE35C7C14EEF8F20D24164E95FCD',
  id: 'da974836-c4bf-11e9-8381-525400b66b12',
  name: '焦庆轩',
  heart_beat_rate: 18000,
  log: true,
  on: {
    inited: function (res) {
      console.log('after init')
      console.log(res)
    },/*
    apply_successfully: function (res) {
      console.log('after apply_successfully')
      console.log(res)
    },
    apply_failed: function (res) {
      console.log('after apply_failed')
      console.log(res)
    },
    socket_successfully: function (res) {
      console.log('after socket_successfully')
      console.log(res)
    },
    socket_error: function (res) {
      console.log('after socket_error')
      console.log(res)
    },*/
    socket_message: function (res) {
      console.log('after socket_message')
      console.log(res)
    }/*
    ,
    socket_close: function (res) {
      console.log('after socket_close')
      console.log(res)
    },
    fatal_error: function (res) {
      console.log('after fatal_error')
      console.log(res)
    },*/
  }
}).start()
