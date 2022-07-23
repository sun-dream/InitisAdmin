<template>
  <div class="d-flex justify-content-between mb-2">
    <el-form
      ref="queryForm"
      :inline="true"
      label-width="50px"
      @submit.native.prevent
    >
      <el-form-item label="查询" class="mb-0">
        <el-input v-model="withdrawalRequestsQuery" @keyup.enter.native="getWithdrawalRequestsData()" />
      </el-form-item>
      <el-form-item class="mb-0">
        <v-button type="primary" size="small" icon="el-icon-search" @click="getWithdrawalRequestsData()">
          查询
        </v-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VButton from '../../baseComponents/VButton.vue'
import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
export default {
  name: 'WithdrawalRequestsQuery',
  components: {
    VButton
  },
  mixins: [withdrawalRequestsMixins],
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
</style>
