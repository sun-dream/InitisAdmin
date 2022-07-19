<template>
  <div class="d-flex justify-content-between mb-2">
    <el-form
      ref="queryForm"
      :inline="true"
      label-width="50px"
      @submit.native.prevent
    >
      <el-form-item label="查询" class="mb-0">
        <el-input v-model="brandStoresQuery" @keyup.enter.native="getBrandStoresData()" />
      </el-form-item>
      <el-form-item class="mb-0">
        <v-button type="primary" size="small" icon="el-icon-search" @click="getBrandStoresData()">
          查询
        </v-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VButton from '../../baseComponents/VButton.vue'
import brandStoresMixins from '@/mixins/brandStores'
export default {
  name: 'BrandStoresQuery',
  components: {
    VButton
  },
  mixins: [brandStoresMixins],
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
