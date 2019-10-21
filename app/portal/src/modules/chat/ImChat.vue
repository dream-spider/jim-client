<template>
  <div class="im-container">
    <el-row :gutter="10">
      <el-col :span="2">
        <div class="sideBar">
          <el-avatar shape="square" :size="50" fit="fill" :src="avatars[userInfo.avatar]"></el-avatar>
          <el-link type="info" style="width: 100%">{{userInfo.userName}}</el-link>
          <el-menu default-active="1" mode="vertical" background-color="#483348" @select="handleMenuSelect">
            <el-menu-item index="1">
              <i class="el-icon-chat-dot-round"></i>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-user"></i>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-present"></i>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="5" v-if="menu.active==='chat'">
        <session-panel :sessionList="sessionData" :activeSession="session.sessionId" :mutationSession="mutationSession" :me="userInfo" @startChat="startChat"></session-panel>
      </el-col>
      <el-col :span="17" v-if="menu.active==='chat'&&session.sessionId!=null">
        <chat-panel :msgContent="msgContent" :me="userInfo" :friend="talkingFriend"  :sessionId="session.sessionId" :groupId="clientId" @sendMsg="sendMsg"></chat-panel>
      </el-col>
      <el-col :span="10" v-if="menu.active==='contact'">
        <div style="height: 41em; padding-top: 0.2em;">
          <contact-list :userId="userInfo.userId" @choose="choose"></contact-list>
        </div>
      </el-col>
      <el-col :span="12" v-if="menu.active==='more'">
        <div><session-panel :sessionList="sessionData" :mutationSession="mutationSession" @startChat="startChat"></session-panel></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { user, net, constants } from 'isdk'
import { Notification, Loading } from 'element-ui'
import ContactList from '@modules/contact/ImContact'
import ChatPanel from './components/ChatPanel'
import SessionPanel from './components/SessionPanel'
import { avatars } from '@modules/images'
import config from '@/config'

console.dir(constants)
export default {
  components: {
    'contact-list': ContactList,
    'chat-panel': ChatPanel,
    'session-panel': SessionPanel
  },
  data () {
    return {
      userInfo: {},
      tabPosition: 'left',
      imServerInfo: {},
      socket: {},
      sessionData: [],
      isConnect: false,
      sessionDataLoading: true,
      session: {},
      talkingFriend: {},
      msgContent: [],
      menu: {
        active: 'chat'
      },
      mutationSession: {
        sessionId: '', msg: '', sendTime: '', senderId: '', isNew: null, groupId: null
      },
      chat: {
        total: 0,
        pageNum: 0
      },
      avatars,
      clientId: config.authorization.clientId
    }
  },
  mounted () {
    /**
       * 登录、获取im服务连接信息
       */
    this.applyServer()
  },
  methods: {
    sendMsg (msg) {
      this.socket.send(JSON.stringify(msg))
      this.refreshMutationSession(msg.chatMsg)
    },
    refreshMutationSession ({ sessionId, msg, sendTime, senderId, isNew, groupId }) {
      this.mutationSession.sessionId = sessionId
      this.mutationSession.senderId = senderId
      this.mutationSession.msg = msg
      this.mutationSession.sendTime = sendTime
      this.mutationSession.isNew = isNew
      this.mutationSession.groupId = groupId
    },
    // 选择对话好友
    async choose (item) {
      this.menu.active = 'chat'
      if (item.id === this.userInfo.userId) {
        return
      }
      let session = []
      if (this.sessionData.length > 0) {
        session = this.sessionData.filter((data) => {
          return data.users[0].userId === item.id
        })
      }
      if (session.length === 0) {
        const createSessionLoading = Loading.service({
          fullscreen: true,
          text: '正在创建您与[' + item.name + ']的会话，请稍等......'
        })

        const res = await net.createSession({
          createBy: this.userInfo.userId,
          friendId: item.id,
          sessionType: constants.IM_SESSION_TYPE.SINGLE_CHAT,
          groupId: this.clientId
        })
        if (!res.data) {
          return false
        }
        // 获取最新session
        const sessionRes = await net.fetchSessionData(this.userInfo.userId, res.data)
        if (sessionRes.data) {
          this.sessionData.unshift(sessionRes.data[0])
        }
        this.startChat(this.sessionData[0])
        createSessionLoading.close()
      } else {
        this.startChat(session[0])
      }
    },
    handleMenuSelect (key, keyPath) {
      key === '1' ? (this.menu.active = 'chat') : (key === '2' ? (this.menu.active = 'contact') : this.menu.active = 'more')
    },
    applyServer () {
      /**
         * 登录im服务器
         */
      net.applyImServer(this.$props.userId, false).then((res) => {
        if (!res) {
          return false
        }
        this.userInfo = res.data.user
        this.imServerInfo = res.data.imServerVO
        this.initIMConnection()
      })
    },
    // 创建聊天窗口
    startChat (session) {
      this.talkingFriend = session.users[0]
      this.session = session.session
      if (session.chatMsg && session.chatMsg.state === '10') {
        // 签收消息
        net.signMessage(session.session.sessionId).then(res => {
          session.chatMsg.state = '20'
        })
      }
      if (session.isNew) {
        this.refreshMutationSession(Object.assign(session.chatMsg, { isNew: false }))
      }

      if (session.chatMsg === null) {
        this.msgContent = []
        return
      }
      net.fetchOfflineMessage({
        sessionId: this.session.sessionId,
        pageNum: 1,
        pageSize: 10
      }).then((res) => {
        if (!res) {
          return false
        }
        let pageData = res.data
        if (pageData.total > 0) {
          this.msgContent = pageData.list
          this.chat.total = pageData.total
        }
      })
    },
    sendHeartBeat () {
      // 定时发送心跳
      let heartBeatMsg = {
        actionType: constants.IM_ACTION_TYPE.HEART_BEAT,
        chatMsg: {
          senderId: this.userInfo.userId, senderName: this.userInfo.userName, groupId: this.clientId
        }
      }
      this.socket.send(JSON.stringify(heartBeatMsg))
    },
    initIMConnection () {
      if (!window.WebSocket) {
        Notification.error({
          title: '提示',
          message: '浏览器不支持websocket'
        })
        return
      }
      let serverUrl = 'ws://' + this.imServerInfo.serverIp + ':' + this.imServerInfo.serverPort + '/' + this.imServerInfo.serverContext
      this.socket = new WebSocket(serverUrl)
      this.socket.onopen = this.onopen
      this.socket.onopen = this.onopen
      this.socket.onerror = this.onerror
      this.socket.onmessage = this.onmessage
    },
    onopen () {
      this.sessionDataLoading = false
      console.log('连接成功')
      this.isConnect = true
      let loginMsg = {
        actionType: constants.IM_ACTION_TYPE.ONLINE,
        chatMsg: {
          senderId: this.userInfo.userId, senderName: this.userInfo.userName, groupId: this.clientId
        }
      }
      this.socket.send(JSON.stringify(loginMsg))
    },
    onclose () {
      console.log('连接已经断开')
      Notification.error({
        title: '提示',
        message: '检测到您的账号在别处登录，当前会话将被下线'
      })
    },
    onerror () {
      console.log('连接发生错误，10秒后重新发起连接')
      setTimeout(this.applyServer(), 10000)
    },
    onmessage (e) {
      let msg = JSON.parse(e.data)
      /**
         * 建立连接
         *
         */
      switch (msg.code) {
        case constants.IM_MSG_ACTION_TYPE.CONNECTION_ESTABLISH:
          if (msg.data.length > 0) {
            this.sessionData = msg.data
          }
          /**
             * 发送心跳
             */
          setInterval(this.sendHeartBeat, 18000)
          break
        case constants.IM_MSG_ACTION_TYPE.HEART_BEAT_RESPONSE:
          console.log(msg.message)
          break
        case constants.IM_MSG_ACTION_TYPE.CHAT_RESPONSE:
          let data = msg.data
          if (data.senderId === this.talkingFriend.userId) {
            // 信息发送人是当前聊天对象，则刷新聊天内容
            this.msgContent.push(data)
          }
          // 信息发送人不是当前聊天对象，刷新会话消息
          this.refreshMutationSession(data)
          break
      }
    },
    handleMouseover ($event) {
      $event.currentTarget.className = 'session-div mouse-over'
    },
    handleMouseout ($event) {
      $event.currentTarget.className = 'session-div mouse-out'
    }
  },
  props: {
    userId: String
  }
}
</script>

<style scoped>
  .im-container {
    margin: 20px 10px 10px 10px;
  }

  .sideBar {
    padding-top: 1em;
    text-align: center;
    background-color: #483348;
    height: 40em;
  }
</style>
