<template>
  <v-overlay :value="fetching" :z-index="200" :opacity="fetchingOption.opacity">
    <v-progress-circular 
        :size="fetchingOption.size" 
        :width="fetchingOption.width" 
        :color="fetchingOption.color" 
        indeterminate
    >
      <span class="loading-text">{{fetchingOption.loadingText}}</span>
    </v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  name: "Vloading",
  props: {},
  components: {},
  data() {
    return {
    };
  },
  computed: {
    fetching() {
      return this.$store.getters["logic/fetching/fetching"];
    },
    fetchingOption() {
      return this.$store.getters["logic/fetching/fetchingOption"];
    },
  },
  mounted() {},
  methods: {
  },
};
</script>
<style  scoped>
    .loading-text{
    color:#ffffff;
    }
</style>