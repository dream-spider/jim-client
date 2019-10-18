<template>
  <div style="height: 80%;" >
    <chat-content :msgContent="msgContent" :me="me" :friend="friend"></chat-content>
    <el-pagination
      layout="prev, pager, next"
      :page-size="10"
      @current-change="fetchHistoryMessage"
      :current-page="pageNum"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import ChatContent from './ChatContent'
import api from 'isdk/api'
export default {
  name: 'ChatHistory',
  components: {
    'chat-content': ChatContent
  },
  data: function () {
    return {
      msgContent: [],
      total: 0,
      pageNum: 1,
      loading: true
    }
  },
  props: {
    friend: Object,
    me: Object,
    sessionId: String
  },
  mounted () {
    this.fetchHistoryMessage()
  },
  methods: {
    fetchHistoryMessage (pageNum) {
      if (pageNum) {
        this.pageNum = pageNum
      }
      api.fetchOfflineMsg({
        sessionId: this.sessionId,
        pageNum: this.pageNum,
        pageSize: 10
      }).then((res) => {
        if (!res) {
          return false
        }
        let pageData = res.data.data
        if (pageData.total > 0) {
          this.msgContent = pageData.list
          this.total = pageData.total
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
