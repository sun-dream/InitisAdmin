<template>
  <preset-libraries />
</template>
<script>
import PresetLibraries from '@/components/PresetLibraries'
import breadcrumbMixins from '@/mixins/breadcrumb'
import presetLibrariesMixins from '@/mixins/presetLibraries'
export default {
  name: 'PresetLibrariesPage',
  components: {
    PresetLibraries
  },
  mixins: [presetLibrariesMixins, breadcrumbMixins],
  mounted () {
    this.breadcrumbs = [{ text: '预设管理', cpnName: 'preset-libraries' }]
    if (this.$route.query && this.$route.query.query) {
      this.getPresetLibrarieData({ query: this.$route.query.query })
    } else {
      this.getPresetLibrarieData()
    }
  }
}
</script>
