<template>
  <div class="wrap">
    <index-list :data="contactList"  @choose="onChoose" v-if="contactList.length"></index-list>
  </div>
</template>

<script>
import IndexList from './components/IndexList'
import { user } from '@isdk'
export default {
  name: 'ImContact',
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
    user.fetchContactList('').then((res) => {
      if (!res.data) {
        return false
      }
      this.contactList = res.data
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
<style lang="scss">
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
