<template>
  <div class="session-box" v-loading.fullscreen.lock="sessionDataLoading" >
    <el-input
      placeholder="搜索" v-model="sessionKeyword"
      prefix-icon="el-icon-search">
    </el-input>
    <div class="splitter"></div>
    <div style="overflow: auto;height: 38em;">
      <div class="session-div" v-for="data in sessionList" :key="data.session.userId" @click="startChat(data)"
           v-show="!data.hide"    @mouseover="handleMouseover($event)" @mouseout="handleMouseout($event)">
        <el-row>
          <el-col :span="6">
            <el-badge :is-dot="data.isNew">
              <el-avatar shape="square" :size="60" fit="contain" :src="avatars[data.users[0].avatar]"></el-avatar>
            </el-badge>
          </el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="10"><span class="userNameTitle">{{data.users[0].userName}}</span></el-col>
              <el-col :span="14" class="timeTitle"><span v-if="data.chatMsg!=null">{{data.chatMsg.sendTime|dateformat()}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><span class="last-msg" v-if="data.chatMsg!=null">{{data.chatMsg.msg.length>12?data.chatMsg.msg.substring(0,12)+'...':data.chatMsg.msg}}</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="splitter"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { net } from '@isdk'
import { avatars } from '@modules/images'
export default {
  name: 'SessionPanel',
  data () {
    return {
      sessionDataLoading: false,
      sessionKeyword: '',
      avatars
    }
  },
  props: {
    sessionList: Array,
    mutationSession: Object,
    me: Object,
    activeSession: String
  },
  watch: {
    mutationSession: {
      deep: true,
      handler: async function (val) {
        // 刷新session列表状态
        let activeSessionIndex = null
        for (let i = 0; i < this.sessionList.length; i++) {
          if (this.sessionList[i].session.sessionId === val.sessionId) {
            activeSessionIndex = i
            break
          }
        }
        if (activeSessionIndex === null) {
          // 获取最新session
          const sessionRes = await net.fetchSessionData(this.me.userId, val.sessionId)
          if (sessionRes.data) {
            this.sessionList.unshift(Object.assign(sessionRes.data[0], { isNew: true }))
          }
          return
        }
        // 刷新会话状态
        let sessionData = this.sessionList[activeSessionIndex]
        sessionData.chatMsg = (sessionData.chatMsg === null ? {} : sessionData.chatMsg)
        sessionData.chatMsg.msg = val.msg
        sessionData.chatMsg.sendTime = val.sendTime
        sessionData.chatMsg.sessionId = val.sessionId
        this.$set(sessionData, 'isNew', (sessionData.session.sessionId !== this.activeSession))
        // 变动的会话置顶
        if (activeSessionIndex > 0) {
          this.sessionList.unshift(this.sessionList.splice(activeSessionIndex, 1)[0])
        }
      }
    },
    sessionKeyword: function (newVal, oldVal) {
      this.querySession()
    }
  },
  methods: {
    querySession () {
      let keyword = this.sessionKeyword
      this.$set(this.sessionList, this.sessionList.map(data => {
        if (!keyword) {
          data.hide = false
          return data
        }
        if (data.users.length > 0) {
          let user = data.users[0]
          if (user.firstLetters.includes(keyword.toUpperCase())) {
            return data
          }
        }
        if (data.chatMsg != null) {
          if (data.chatMsg.msg.includes(keyword)) {
            return data
          }
        }
        data.hide = true
        return data
      }))
    },
    startChat (session) {
      this.$emit('startChat', session)
    },
    handleMouseover ($event) {
      $event.currentTarget.className = 'session-div mouse-over'
    },
    handleMouseout ($event) {
      $event.currentTarget.className = 'session-div mouse-out'
    }
  }
}
</script>

<style scoped>
  .session-box {
    background-color: #daddde;
    padding-top: 0.2em;
  }

  .splitter {
    height: 0.4em;
  }

  .session-div {
    cursor: pointer;
    padding: 0.25em;
  }
  .userNameTitle {
    font-family: "Times New Roman", Times, serif;
    font-size: 0.9em;
    color: #000000;
    padding-left: 0.1em;
    margin-top: 2px;
  }

  .timeTitle {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.6em;
    color: #6e6e6e;
    text-align: right;
  }

  .last-msg {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8em;
    padding-left: 0.1em;
    color: #7f7f7f;
  }
  .mouse-over {
    background-color: #babdbe;
  }

  .mouse-out {
    background-color: #daddde;
  }
</style>
