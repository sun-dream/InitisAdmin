<template>
  <main class="the-frame h-100 w-100">
    <div class="logo-container">
      <v-logo :size="40" class="mb-3 v-logo" />
    </div>
    <el-row class="w-100 the-row-wrap d-flex h-100">
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        class="h-100 d-flex justify-center align-center the-frame-wrap"
      >
        <section class="main-card">
          <h2>{{ title }}</h2>
          <div class="a-card-content">
            <div class="main-content">
              <slot />
            </div>
            <section class="login-footer">
              <slot name="footer" />
            </section>
          </div>
        </section>
      </el-col>
      <!-- <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="8"
        :xl="8"
        class="d-none d-sm-none d-md-none d-lg-flex justify-center align-center img-warp"
      >
        <img src="../../static/Login-large@2x.png">
      </el-col> -->
    </el-row>
  </main>
</template>

<script>
import VLogo from '@/baseComponents/VLogo'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Frame',
  components: { VLogo },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="scss">
@import "../../assets/sass/color.scss";
.the-frame {
  position: relative;
  overflow: hidden;
}
.logo-container {
  position: absolute;
  left: 32px;
  top: 28px;
  width: 200px;
}
@media (max-width: 768px) {
  .logo-container {
    left: 50%;
    transform: translateX(-50%);
  }
}
.main-card {
  position: relative;
  width: 440px;
  margin:auto;
  border-radius: 5px;
  background-color: white;
  h2 {
    font-weight: 500;
    font-size: 21px;
    line-height: 28px;
    color: #333333;
    margin-bottom: 20px;
  }
}
.title-toobar {
  box-shadow: none !important;
}
.the-row-wrap {
  padding-bottom: 60px;
}
.the-frame-wrap {
  overflow: hidden;
}
.img-warp {
  overflow: hidden;
  background-color: $primary;
  img {
    max-width: 600px;
    max-height: 100%;
    min-width: auto;
    height: 550px;
    width: auto;
  }
}
</style>
