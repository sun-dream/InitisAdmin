<template>
  <div class="d-flex justify-content-between mb-2">
    <el-form
      ref="queryForm"
      :inline="true"
      :model="filter"
      label-width="50px"
      class="demo-form-inline"
      @submit.native.prevent
    >
      <el-form-item label="查询" class="mb-0">
        <el-input v-model="productQuery" @keyup.enter.native="getProductAllData()" />
      </el-form-item>
      <el-form-item class="mb-0">
        <v-button type="primary" size="small" icon="el-icon-search" @click="getProductAllData()">
          查询
        </v-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VButton from '../../baseComponents/VButton.vue'
import publicUseMixins from '@/mixins/publicUse'
import allProductMixins from '@/mixins/product/allProduct'
export default {
  name: 'ProductFilter',
  components: {
    VButton
  },
  mixins: [publicUseMixins, allProductMixins],
  props: {
  },
  data () {
    return {
      filter: {
        query: ''
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>

</style>
