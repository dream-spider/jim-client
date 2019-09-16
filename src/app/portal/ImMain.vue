<template>
  <el-table
    :data="tableData" v-loading="loading"
    style="width: 100%">
    <el-table-column
      prop="userName"
      label="用户名"
      width="300">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini"
                   icon="el-icon-user"
                   @click="startChat(scope.row)">开始聊天</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import api from '@business/home/api'
import { hello } from '@/isdk/index.ts'
export default {
  name: 'index',
  methods: {
    queryCustomeServiceList () {
      this.loading = true
      api.queryCustomerList().then((res) => {
        this.tableData = res.data.data
        this.loading = false
      })
    },
    startChat (rowData) {
      this.$router.push({ name: 'chat', query: { userId: rowData.userId } })
    }
  },
  created () {
    this.queryCustomeServiceList()
    console.log(1)
    hello()
  },
  data () {
    return {
      tableData: null,
      loading: false
    }
  }
}
</script>

<style scoped>

</style>
