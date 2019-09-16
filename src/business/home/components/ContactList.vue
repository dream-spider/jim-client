<template>
  <div class="wrap">
    <index-list :data="contactList"  @choose="onChoose" v-if="contactList.length"></index-list>
  </div>
</template>

<script>
import IndexList from '@common/components/IndexList'
import api from '@business/home/api'
export default {
  name: 'ContactList',
  model: {
    event: 'choose'
  },
  props: {
    userId: String
  },
  data () {
    return {
      contactList: []
    }
  },
  created () {
    api.fetchContactList('').then((res) => {
      if (!res.data) {
        return false
      }
      this.contactList = res.data.data
    })
  },
  methods: {
    onChoose (item) {
      this.$emit('choose', item)
    }
  },
  components: {
    IndexList
  }
}
</script>
<style lang="less">
  * {
    margin: 0;
    padding: 0;
  }
  .wrap {
    /*position: fixed;*/
    width: 50%;
    height: 100%;
    top: 0;
    bottom: 0;
  }
</style>
