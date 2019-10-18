<template>
  <div style="height:100%">
    <el-container>
      <el-main>
        <router-view style="height:calc(100% - 50px)"></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'Layout'
}

</script>
