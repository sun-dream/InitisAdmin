<template>
  <section class="w-100 h-100 p-3">
    <product-table />
  </section>
</template>

<script>
import productTable from './productTable'
import allProductMixins from '@/mixins/product/allProduct'
export default {
  name: 'AllProductIndex',
  components: { productTable },
  mixins: [allProductMixins],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>
