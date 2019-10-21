import { net, utils, constants, config } from 'isdk'
import bus, { IEvents, EventBus } from './src/eventBus'
import { IUser, IImServerInfo } from 'isdk/defines'
import Logger from './src/logger'

enum EVENT_NAME {
  inited = 'inited',
  apply_successfully = 'apply_successfully',
  apply_failed = 'apply_failed',
  socket_successfully = 'socket_successfully',
  socket_error = 'socket_error',
  socket_message = 'socket_message',
  socket_close = 'socket_close',
  fatal_error = 'fatal_error',
  send_hreatbeat = 'send_heartbeat'
}

interface IJimSDKOption {
  request_ctx: string,
  client_id: string,
  id: string
  name: string
  log?: boolean,
  heart_beat_rate: number
  on: IEvents,
  user_auto_register: boolean
}

class JimSDK {
  private _option: IJimSDKOption
  private logger: Logger
  private eventBus: EventBus = bus
  private socket: WebSocket
  private userInfo: IUser
  private imServerInfo: IImServerInfo

  init (option: IJimSDKOption) {
    this._option = {
      request_ctx: option.request_ctx || '/jim-router',
      client_id: option.client_id || '',
      id: option.id || '',
      name: option.name || '',
      on: option.on,
      log: option.log === true ? true : false,
      heart_beat_rate: option.heart_beat_rate || 18,
      user_auto_register: option.user_auto_register || false
    }

    config.configIsdk({
      axios: {
        requestContext: this._option.request_ctx
      }
    })

    this.logger = new Logger(this._option.log)
    this.eventBus.$register(this._option.on)

    this.logger.info(EVENT_NAME.inited, this._option)
    this.eventBus.$emit(EVENT_NAME.inited, this._option)
    return this
  }

  async applyImServer () {
    const [err, res] = await utils.catchedAsync(net.applyImServer(this._option.id, this._option.user_auto_register))
    if (err||res.code!=='200') {
      this.logger.error(EVENT_NAME.apply_failed, err)
      this.eventBus.$emit(EVENT_NAME.apply_failed, err)
    } else {
      this.logger.info(EVENT_NAME.apply_successfully, res.data)
      this.eventBus.$emit(EVENT_NAME.apply_successfully, res.data)

      this.userInfo = res.data.user
      this.imServerInfo = res.data.imServerVO
    }
  }

  connectImServer () {
    if (!window.WebSocket) {
      this.logger.error(EVENT_NAME.fatal_error, '浏览器不支持Websocket')
      this.eventBus.$emit(EVENT_NAME.fatal_error)
      return
    }

    let serverUrl = 'ws://' + this.imServerInfo.serverIp + ':' + this.imServerInfo.serverPort + '/' + this.imServerInfo.serverContext
    this.socket = new WebSocket(serverUrl)
    this.socket.onopen = this._onSocketOpen.bind(this)
    this.socket.onmessage = this._onSocketMessage.bind(this)
    this.socket.onerror = this._onSocketError.bind(this)
    this.socket.onclose = this._onSocketClose.bind(this)
  }

  _onSocketOpen (res: any) {
    let loginMsg = {
      actionType: constants.IM_ACTION_TYPE.ONLINE,
      chatMsg: {
        senderId: this.userInfo.userId,
        senderName: this.userInfo.userName,
        groupId: this._option.client_id
      }
    }
    this.socket.send(JSON.stringify(loginMsg))
    this.eventBus.$emit(EVENT_NAME.socket_successfully, res)
  }

  _onSocketError (res: any) {
    this.eventBus.$emit(EVENT_NAME.socket_error, res)
  }

  _onSocketMessage (event: MessageEvent) {
    let msg = JSON.parse(event.data)
    this.logger.info(EVENT_NAME.socket_message, msg)
    switch (msg.code) {
      case constants.IM_MSG_ACTION_TYPE.CONNECTION_ESTABLISH:
        /**
         * 发送心跳
         */
        this.logger.info(EVENT_NAME.socket_message, this.userInfo)
        setInterval(this._sendHeartBeat.bind(this), this._option.heart_beat_rate)

        break
      case constants.IM_MSG_ACTION_TYPE.HEART_BEAT_RESPONSE:
        this.logger.info(EVENT_NAME.socket_message, msg.message)
        break
      case constants.IM_MSG_ACTION_TYPE.CHAT_RESPONSE:
        this.eventBus.$emit(EVENT_NAME.socket_message, msg.data)
        break
    }
  }

  _onSocketClose (res: any) {
    this.eventBus.$emit(EVENT_NAME.socket_close, res)
  }

  _sendHeartBeat () {
    let heartBeatMsg = {
      actionType: constants.IM_ACTION_TYPE.HEART_BEAT,
      chatMsg: {
        senderId: this.userInfo.userId,
        senderName: this.userInfo.userName,
        groupId: this._option.client_id
      }
    }
    this.socket.send(JSON.stringify(heartBeatMsg))
  }

  start () {
    this.applyImServer().then(() => {
      return this.connectImServer()
    })
  }


}
//@ts-ignore
window.JimSDK = JimSDK

export default JimSDK
