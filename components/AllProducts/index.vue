<template>
  <section class="w-100 ">
    <product-filter />
    <product-table />
  </section>
</template>

<script>
import productTable from './productTable'
import productFilter from './productFilter'
import allProductMixins from '@/mixins/product/allProduct'
export default {
  name: 'AllProductIndex',
  components: { productTable, productFilter },
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
