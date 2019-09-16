<template>
  <div style=height:100%>
    <el-container>
      <!--<app-header></app-header>-->
      <el-main>
        <router-view style="height:calc(100% - 50px)"></router-view>
      </el-main>
      <el-footer>
        <app-footer></app-footer>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import Header from '@common/components/main/Header'
import Footer from '@common/components/main/Footer'

export default {
  components: {
    'AppHeader': Header,
    'AppFooter': Footer
  }
}

</script>

<style scoped>
.el-header,
.el-main {
  padding: 0;
  height: 100%;
}
.full-height {
  height: 100%;
}
</style>
