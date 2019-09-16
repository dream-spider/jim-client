<template>
  <p class="footer" @click="openSite">
    @Copyright 2010 深圳天源迪科信息技术股份有限公司 版权所有
  </p>
</template>
<script>
export default {
  name: 'FootInfo',
  data () {
    return {
      msg: 'this is from bottomer'
    }
  },
  methods: {
    openSite () {
      window.open('https://www.tydic.com/')
    }
  }
}
</script>

<style scoped="scoped">
  .footer {
    font-size: 16px;
    color: #909399;
    text-align: center;
    cursor: pointer
  }
  .footer:hover{
    color: #222329;
    transition:color 0.1s linear;
  }
</style>
