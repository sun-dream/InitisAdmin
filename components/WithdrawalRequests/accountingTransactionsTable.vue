<template>
  <div />
</template>

<script>

import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
import publicUseMixins from '@/mixins/publicUse'
import * as mUtils from '@/assets/utils/mUtils'
export default {
  name: 'AccountingTransactionsTable',
  components: {
  },
  mixins: [withdrawalRequestsMixins, publicUseMixins],
  props: {
    defaultData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  computed: {
    getDate (val) {
      return function (val) {
        return mUtils.formatDate(val, 3)
      }
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.detail-item{
        margin-bottom: 10px;
        &+.detail-item{
          margin-top: 40px;
        }
        .detail-item-line{
            font-size: 14px;
            margin-bottom: 10px;
        }
    }
.fontBold{
    font-weight: bold;
}
.item-title{
    display: inline-block;
    width:120px;
    text-align: right;
    margin-right: 6px;
}
.pic-wrap{
  width: 160px;
  height: 160px;
}
</style>
