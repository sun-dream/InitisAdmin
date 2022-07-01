<template>
  <v-container class="container p-0" v-if="isShow">
    <v-breadcrumbs :items="breadcrumbs" >
    </v-breadcrumbs>
  </v-container>
</template>

<script>
const showCpnName = [
        'product-list-categoryId',
        'product-list',
        'product-sort-object',
        'product-sort-object-sort',
        'product-detail-productNumber',
        'product-search-searchKeyword',
        'user-orders',
        'user-payment',
        'user-payment-paymentId',
        'user-orders-orderDetail',
        'user-favorites',
        'checkout-checkoutProductNumber',
        'upload-orders'
]
import breadcrumbMixins from "@/mixins/breadcrumb";
export default {
  name: "VBreadCrumb",
  asyncData(){
    return {
    }
  },
  data() {
    return {};
  },
  mixins: [breadcrumbMixins],
  computed:{
    isShow(){
        let show = showCpnName.some(item=> item === this.$route.name)
        if(!show){
            this.breadcrumbs = []
        }
        return show
    }
  },
};
</script>
<style>
.the-v-footer {
  font-size: 12px;
}
</style>
