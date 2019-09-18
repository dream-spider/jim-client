<template>
  <div class="error-body clearfix">
    <img src="@modules/images/test.jpg"
           alt="">
    <div v-if="$route.query.errorCode === '403'">
      <p class="fs22">对不起，您没有该页面的访问权限！</p>
    </div>
    <div v-else-if="$route.query.errorCode === '500'">
      <p class="fs22">服务器出错了，请联系管理员！</p>
    </div>
    <div v-else>
      <p class="fs22">对不起，您所访问的页面不存在！</p>
    </div>
    <div class="clearfix  mt20"></div>
    <div class="btn-title ac">
      <el-button type="success"
                 @click="$router.push({name: 'home'})"
                 size="mini">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error'
}
</script>
