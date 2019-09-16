<template>
  <div class="error-body clearfix">
    <div v-if="errorCode==='403'">
      <img src="@assets/images/icon_403.png"
           alt="">
      <p class="fs22">对不起，您没有该页面的访问权限！</p>
    </div>
    <div v-if="errorCode==='404'">
      <img src="@assets/images/icon_404.png"
           alt="">
      <p class="fs22">对不起，您所访问的页面不存在！</p>
    </div>
    <div v-if="errorCode==='500'">
      <img src="@assets/images/icon_500.png"
           alt="">
      <p class="fs22">服务器出错了，请联系管理员！</p>
    </div>
    <div class="clearfix  mt20"></div>
    <div class="btn-title ac">
      <el-button type="success"
                 @click="goIndex"
                 size="mini">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  props: {
    errorCode: String
  },
  data () {
    return {
    }
  },
  methods: {
    goIndex () {
      this.$router.push('/')
    }
  }
}
</script>
