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
import { net, user } from '@isdk'
import { of, Observable, from } from 'rxjs'
export default {
  name: 'ImMain',
  methods: {
    queryCustomeServiceList () {
      this.loading = true
      user.queryCustomerList().then((res) => {
        console.log(res)
        this.tableData = res.data
        this.loading = false
      })
    },
    startChat (rowData) {
      this.$router.push({ name: 'chat', query: { userId: rowData.userId } })
    }
  },
  created () {
    this.queryCustomeServiceList()


    // const stream$ = of('1', '2')

    // stream$.subscribe((v) => {
    //   console.log(v)
    // })
    // stream$.subscribe((v) => {
    //   console.log(v)
    // })
    // function timesTen (numbers$) {
    //   let result$ = Observable.create((observer) => {
    //     numbers$.subscribe({
    //       next: (v) => observer.next(v * 10)
    //     })
    //   })

    //   return result$
    // }

    // const arr$ = from([1, 2, 3])
    // const ten$ = timesTen(arr$)

    // ten$.subscribe(console.log)

    // function formatDate (date$) {
    //   let formatted$ = Observable.create((observer) => {
    //     date$.subscribe((v) => {
    //       observer.next(`${v.getUTCFullYear()}-${v.getUTCMonth() + 1}-${v.getUTCDate() + 1}`)
    //     })
    //   })
    //   return formatted$
    // }

    // const date$ = from([new Date(), new Date('2019-10-10'), new Date('2019-10-11')])
    // const formatted$ = formatDate(date$)
    // formatted$.subscribe(console.log)

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
