<template>
  <el-header>
    <!--<el-row>
      <el-col :span="20">
        <el-menu :default-active="activeIndex"
                 class="el-menu-demo"
                 mode="horizontal">
          <el-menu-item index="1"
                        @click="$router.push('/home/indx')">菜单1</el-menu-item>
          <el-submenu index="2">
            <template slot="title">菜单2</template>
            <el-menu-item index="2-1">菜单21</el-menu-item>
            <el-menu-item index="2-2">菜单22</el-menu-item>
            <el-menu-item index="2-3">菜单23</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">菜单3</template>
              <el-menu-item index="2-4-1">菜单31</el-menu-item>
              <el-menu-item index="2-4-2">菜单32</el-menu-item>
              <el-menu-item index="2-4-3">菜单33</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3"
                        disabled>菜单3不可用</el-menu-item>
          <el-menu-item index="4">菜单4</el-menu-item>
        </el-menu>

      </el-col>

      <el-col :span="4">
        <el-dropdown @command="personalOperation">
          <div style="cursor: pointer;color: #434343">
            欢迎你！{{user.userName}}
            <i class="el-icon-arrow-down hander"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>-->
  </el-header>

</template>

<script>
export default {
  data () {
    return {
      activeIndex: this.$store.getters['auth/indexPage'],
      user: this.$store.getters['auth/user']
    }
  },
  computed: {
    menuTree () {
      return this.$store.getters['auth/menuTree']
    }
  },
  created () {
    // 组件初始化之后进入默认路由
    this.$router.replace('/home/index')
    // this.$router.replace(this.$store.getters['auth/indexPage'])
  },
  mounted () {
  },
  methods: {
    personalOperation (command) {
      switch (command) {
        case 'logout':
          // 登出系统
          this.$store.dispatch('auth/logout')
          break
      }
    }
  }

}
</script>

<style scoped>
.user-info {
  font-family: "PingFang SC";
}
.el-dropdown {
  color: #fff;
  font-size: initial;
  display: initial;
}
</style>
