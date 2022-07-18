<template>
  <section class="w-100 categorg-wrap">
    <payments-query />
    <el-table :data="paymentsList" border size="small" max-height="700">
      <el-table-column prop="name" label="名称" width="160" />

      <el-table-column prop="description" label="备注" min-width="160" />
      <el-table-column prop="name" label="操作" width="160">
        <!-- <template slot-scope="scope">
          <el-button type="text" size="small">
            编辑
          </el-button>
        </template> -->
      </el-table-column>
    </el-table>
    <v-paginations
      :vuex-path="paymentsVuexBasePath"
      algin-right
      @pageChange="pageChangeHandler"
    />
  </section>
</template>
<script>
import paymentsQuery from './paymentsQuery.vue'
import paymentsMixins from '@/mixins/payments'

// eslint-disable-next-line no-unused-vars
import * as mUtils from '@/assets/utils/mUtils'
import VPaginations from '@/baseComponents/VPaginations'
export default {
  name: 'PaymengList',
  components: {
    VPaginations, paymentsQuery
  },
  mixins: [paymentsMixins],
  data () {
    return {
      categoryDialog: false,
      categoryFormTitle: '',
      selectEditId: null
    }
  },
  computed: {
    getDate (val) {
      return function (val) {
        return mUtils.formatDate(val, 3)
      }
    }
  },
  mounted () {
  },
  methods: {
    pageChangeHandler () {
      this.getPaymentsData()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";

</style>
