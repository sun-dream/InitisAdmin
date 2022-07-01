<template>
  <v-img
    :src="imgSrc"
    :lazy-src="lazySrc"
    :width="width"
    :height="height"
    @error="errorHandler()"
  >
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        ></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>
<script>
const defaultImgSrc = '/default.png'
export default {
  name: "VImage",
  props:{
    src:{
      type:String,
      default: defaultImgSrc
    },
    lazySrc:{
      type:String,
      default:''
    },
    width:{
      type:String | Number
    },
    height:{
      type:String | Number
    }
  },
  components: {
  },
  data() {
    return {
      failed_image:false
    };
  },
  computed: {
    imgSrc(){
      if(this.failed_image || this.src === ''){
        return defaultImgSrc
      }else{
        return this.src
      }
    }
  },
  mounted() {},
  methods: {
    errorHandler() {
      this.failed_image = true;
    },
  },
};
</script>
<style  scoped>
</style>
