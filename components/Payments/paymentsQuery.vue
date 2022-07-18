<template>
  <div class="d-flex justify-content-between mb-2">
    <el-form
      ref="queryForm"
      :inline="true"
      label-width="50px"
      @submit.native.prevent
    >
      <el-form-item label="查询" class="mb-0">
        <el-input v-model="paymentsQuery" @keyup.enter.native="getPaymentsData()" />
      </el-form-item>
      <el-form-item class="mb-0">
        <v-button type="primary" size="small" icon="el-icon-search" @click="getPaymentsData()">
          查询
        </v-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VButton from '../../baseComponents/VButton.vue'
import paymentsMixins from '@/mixins/payments'
// import VImage from '@/baseComponents/VImage'
export default {
  name: 'PaymentsQuery',
  components: {
    VButton
  },
  mixins: [paymentsMixins],
  props: {
  },
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
   .shipment-wrap{
      padding-top: 2px;
   }
</style>
