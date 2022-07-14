<template>
  <el-dialog :title="'订单地址'" :visible="dialogStatus" width="60%">
    <div v-if="address.id" class="address-wrap">
      <p><span>收货人:</span>{{ address.first_name }}.{{ address.last_name }}</p>
      <p><span>电话:</span>{{ address.phone }}</p>
      <p><span>邮箱:</span>{{ address.email }}</p>
      <p>
        <span>地址:</span>
        {{ address.country }}.
        {{ address.city }}.
        {{ address.street }}.
        {{ address.company }}.
        {{ address.address1 }}.
        {{ address.address2 }}
      </p>
      <p> <span>邮编:</span> {{ address.postal_code }}</p>
    </div>
    <div slot="footer" class="dialog-footer">
      <v-button @click="closeHandler">
        取 消
      </v-button>
    </div>
  </el-dialog>
</template>

<script>
import VButton from '../../baseComponents/VButton.vue'
import userMixins from '@/mixins/user'
import uploadFilesMixins from '@/mixins/uploadFiles'
export default {
  name: 'UserFilter',
  components: {
    VButton
  },
  mixins: [userMixins, uploadFilesMixins],
  props: {
    defaultData: {
      type: Object,
      default: () => {}
    },
    dialogStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      address: {}
    }
  },
  watch: {
    dialogStatus (newData, oldData) {
      if (newData && this.defaultData.address_id) {
        this.address = this.defaultData.address
      }
    }
  },
  methods: {
    closeHandler () {
      this.$emit('update:dialogStatus', false)
    }

  }
}
</script>
<style lang="scss" scoped>
    .address-wrap{
        padding: 0 10px;
        p{
            line-height: 24px;
        }
        span{
            font-weight: bold;
            display: inline-block;
            width:80px;
            letter-spacing: 1px;
            text-align: right;
            margin-right: 4px;
            margin-bottom: 6px;
        }
    }
</style>
