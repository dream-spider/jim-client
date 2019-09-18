<template>
  <div class="chat-pannel">
    <!--title-->
    <div class="chat-title">
      {{friend.userName}}
    </div>
    <!--chat content-->
    <div style="height: 55%;">
      <chat-panel :msgContent="msgContent" :me="me" :friend="friend"></chat-panel>
    </div>
    <div style="height: 6%;text-align: right; background-color: white">
      <el-button-group style="padding:0.5em">
        <el-button  plain size="mini">投诉历史</el-button>
        <el-button  plain size="mini">查询订单</el-button>
        <el-button  plain size="mini" icon="el-icon-time" @click="openChatHistory">聊天记录</el-button>
      </el-button-group>
    </div>
    <!--msg sender-->
    <div class="chat-sender">
      <el-input v-model.trim="hotMsg" resize="none" type="textarea" rows="5" style="height: 75%;"></el-input>
      <div style="padding: 0.3em; float: right;">
        <el-button type="success" @click="sendMsg" plain>发送</el-button>
      </div>
    </div>

    <el-drawer
      :title="chatHistoryTitle"
      :visible.sync="chatHistory"
      direction="rtl"
      size="70%"
      destroy-on-close
    >
      <chat-history :sessionId="sessionId" :me="me" :friend="friend"></chat-history>
    </el-drawer>
  </div>
</template>
<script>
import ChatPanel from './ChatPanel'
import ChatHistory from './ChatHistory'
export default {
  name: 'JimMainPanel',
  components: {
    'chat-panel': ChatPanel,
    'chat-history': ChatHistory
  },
  data: function () {
    return {
      hotMsg: '',
      chatHistory: false
    }
  },
  props: {
    msgContent: Array,
    friend: Object,
    me: Object,
    sessionId: String
  },
  computed: {
    chatHistoryTitle: function () {
      return '与[' + this.friend.userName + ']的聊天记录'
    }
  },
  methods: {
    sendMsg (msg) {
      if (this.hotMsg) {
        let msg = {
          actionType: this.$constants.IM_ACTION_TYPE.SINGLE_CHAT,
          chatMsg: {
            senderId: this.me.userId,
            senderName: this.me.userName,
            receiverId: this.friend.userId,
            msg: this.hotMsg,
            sessionId: this.sessionId
          }
        }

        this.msgContent.push({
          msg: this.hotMsg,
          senderName: this.me.userName,
          sessionId: this.sessionId,
          state: '20',
          sendTime: new Date()
        })
        this.$emit('sendMsg', msg)
        this.hotMsg = ''
      }
    },
    openChatHistory () {
      this.chatHistory = true
    }
  }
}
</script>

<style scoped>
  .chat-pannel {
    background-color: #e0e3e4;
    height: 41em;
  }

  .chat-title {
    height: 5%;
    background-color: #909399;
    color: #daddde;
    text-align: center;
    padding-top: 0.2em;
  }
  .chat-sender {
    height: 25%;
    background-color: #daddde;
  }
</style>
