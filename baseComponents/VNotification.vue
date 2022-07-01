<template>
  <section class="p-2 notification-box">
    <v-alert
      v-for="(alertItem,keys) in alerts"
      border="left"
      colored-border
      elevation="2"
      :type="alertItem.type"
      :icon="getIcon(alertItem.type)"
      :key="alertItem.message + '-' + keys"
      close-text="Close Alert"
      dismissible
      :transition="'slide-x-reverse-transition'"
      class="alerts-item"
    >
      <div v-html="alertItem.message"></div>
    </v-alert>
  </section>
</template>

<script>
export default {
  name: "VNotification",
  data() {
    return {
      defaultIcon: {
        warning: "mdi-alert",
        info: "mdi-alert-octagon-outline",
        error: "mdi-alert",
        success: "mdi-check",
      },
      defaultDuration:2000,
    };
  },
  props: {},
  computed: {
    alerts() {
      return this.$store.getters["logic/notification/alerts"];
    },
  },
  watch: {
    alerts: {
      deep: true,
      handler: function (newVal, oldV) {
        // 每次发生新的i变化的时候给最后一个对象开启定时器
        // 如果有手动设置时间，则按照手动时间到达后，关闭弹出层，
        // 如果 是默认时间，以 defaultDuration 为准
        let lastObjKeys = Object.keys(newVal)[Object.keys(newVal).length - 1];
        if(!this.isDef(newVal[lastObjKeys])){
            return
        }
          if(this.isDef(newVal[lastObjKeys].duration)){
              this.closeCountdownHandler(newVal[lastObjKeys].duration,lastObjKeys)
          }else{
             this.closeCountdownHandler(this.defaultDuration,lastObjKeys)
          }
      },
    },
  },
  mounted() {},
  methods: {
    closeCountdownHandler(duration,keys) {
      setTimeout(() => {
        this.$store.commit('logic/notification/REMOVE_ALERTS',keys)
      }, duration);
    },
    getIcon(type, icon) {
      if (!type && !icon) {
        return this.defaultIcon.info;
      } else if (type && !icon) {
        return this.defaultIcon[type];
      }
    },
  },
};
</script>
<style  scoped>
.notification-box {
  position: fixed;
  right: 0;
  top: 0;
  width: 400px;
  z-index: 10000;
 transition: all .2s;

}
.alerts-item{
    transition: all .2s;

}
</style>

