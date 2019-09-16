<template>
  <span v-if="hasPermission" style="padding-left :5px">
    <slot></slot>
  </span>

</template>

<script>
export default {
  props: {
    authCode: String
  },
  name: 'AuthButton',
  data () {
    return {
    }
  },
  computed: {
    hasPermission: (vm) => {
      let permissionE = vm.$store.getters['auth/elements'].filter(e => {
        return e.id === vm.authCode
      })
      return permissionE.length > 0
    }
  }
}
</script>

<style scoped>

</style>
