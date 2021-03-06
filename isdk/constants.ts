const CONSTANTS = {
  IM_ACTION_TYPE: {
    ONLINE: 'ON_LINE',
    SINGLE_CHAT: 'SINGLE_CHAT',
    GROUP_CHAT: 'GROUP_CHAT',
    HEART_BEAT: 'HEART_BEAT',
    OF_LINE: 'OFF_LINE'
  },
  IM_MSG_ACTION_TYPE: {
    CONNECTION_ESTABLISH: 'CONNECTION_ESTABLISH',
    CONNECTION_CLOSE: 'CONNECTION_CLOSE',
    REPEAT_CONNECTION_REQUEST: 'REPEAT_CONNECTION_REQUEST',
    CHAT_RESPONSE: 'CHAT_RESPONSE',
    CHAT_REDIRECT: 'CHAT_REDIRECT',
    HEART_BEAT_RESPONSE: 'HEART_BEAT_RESPONSE'

  },
  IM_SESSION_TYPE: {
    SINGLE_CHAT: '10',
    GROUP_CHAT: '20'
  },
  IM_MSG_TYPE: {
    PLAIN_TEXT: 'PLAIN_TEXT'
  }
}
export default CONSTANTS
