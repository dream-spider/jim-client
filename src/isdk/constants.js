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
  },
  avatars: {
    avatar1: require('@assets/images/avatar/avatar1.jpg'),
    avatar2: require('@assets/images/avatar/avatar2.jpg'),
    avatar3: require('@assets/images/avatar/avatar3.jpg'),
    avatar4: require('@assets/images/avatar/avatar4.jpg'),
    avatar5: require('@assets/images/avatar/avatar5.jpg'),
    avatar6: require('@assets/images/avatar/avatar6.jpg'),
    avatar7: require('@assets/images/avatar/avatar7.jpg'),
    avatar8: require('@assets/images/avatar/avatar8.jpg'),
    avatar9: require('@assets/images/avatar/avatar9.jpg'),
    avatar10: require('@assets/images/avatar/avatar10.jpg'),
    avatar11: require('@assets/images/avatar/avatar11.jpg')
  }
}
export default CONSTANTS
