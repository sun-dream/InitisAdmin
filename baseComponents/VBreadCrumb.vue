<template>
  <el-breadcrumb separator="/" class="mb-2">
    <template v-for="item in breadcrumbs">
      <el-breadcrumb-item :key="item.text+'-'+item.cpnName">
        <v-link :name="item.cpnName">
          {{ item.text }}
        </v-link>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
import VLink from './VLink'
import breadcrumbMixins from '@/mixins/breadcrumb'
export default {
  name: 'VBreadCrumb',
  components: { VLink },
  mixins: [breadcrumbMixins],
  asyncData () {
    return {
    }
  },
  data () {
    return {}
  },
  computed: {

  }
}
</script>
<style>
</style>
