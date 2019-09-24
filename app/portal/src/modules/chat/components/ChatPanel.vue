<template>
  <div class="chat-msg-content" ref="chatContent">
    <div v-for="content in msgContent" :key="content.msgId" style="padding-top: 0.2em;clear: both;">

      <div v-if="content.senderId == friend.userId" style="float: left; width: 3em;">
        <el-avatar shape="square" :size="50" fit="contain" :src="avatars[friend.avatar]"></el-avatar>
      </div>
      <div v-else style="float: right; width: 3em;">
        <el-avatar shape="square" :size="50" fit="contain" :src="avatars[me.avatar]"></el-avatar>
      </div>
      <div
        :style="content.senderId != friend.userId?'margin-right: 3.5em;text-align:right;':'margin-left: 3.5em;'">
        <div style="font-size: 0.8em;color: #355f6b;padding-bottom: 0.2em;">
          <span>[{{content.senderName}}]</span><span>{{content.sendTime | dateformat()}}</span>
        </div>
        <div
          style="font-size: 0.94em;padding: 0.3em;-webkit-border-radius: 0.5em;-moz-border-radius: 0.5em;border-radius: 0.5em;">
          <span :style="content.senderId != friend.userId?' color: #24bc88;':'color: #3381bc;'">{{content.msg}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { avatars } from '@modules/images'
export default {
  data: function () {
    return {
      avatars
    }
  },
  props: {
    msgContent: Array,
    friend: Object,
    me: Object
  },
  name: 'ChatPanel',
  watch: {
    msgContent: function (newVal, oldVal) {
      if (newVal.length === 0) {
        return
      }
      this.$nextTick(function () {
        this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight
      })
    }
  }
}
</script>

<style scoped>
  .chat-msg-content {
    height: 100%;
    background-color: #daddde;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0.2em 0.1em 0.2em 0.1em
  }
</style>
