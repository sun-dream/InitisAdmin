<template>
  <div>
    <!-- <v-toolbar flat>
      <v-text-field
        v-model="categoryFilter.query"
        label="分类名称"
        hide-details
        append-icon="mdi-magnify"
        @click:append="searchHandle"
      />
      <v-spacer />
      <v-btn color="primary" @click.prevent="createAdminUserHandler">
        <v-icon right dark class="mr-1">
          mdi-shape-circle-plus
        </v-icon>
        新增分类
      </v-btn>
    </v-toolbar>
    <v-dialog
      v-model="categoryDialog"
      persistent
      transition="dialog-top-transition"
      max-width="500px"
    >
      <v-card>
        <v-toolbar color="primary" dark>
          {{ categoryFormTitle }}
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="categoryForm.name"
                    label="分类名称"
                    :rules="categoryFormRules.name"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-switch
                    v-model="categoryForm.status"
                    flat
                    hide-details
                    :true-value="statusEnum.ACTIVE"
                    :false-value="statusEnum.INACTIVE"
                    :label="`状态：${ categoryForm.status === statusEnum.ACTIVE? '启用': '关闭'}`"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    v-model="categoryForm.description"
                    clearable
                    clear-icon="mdi-close-circle"
                    label="描述"
                    auto-grow
                    rows="1"
                    row-height="15"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeEditFormHandler">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveEditFormHandler">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import categoryMixins from '@/mixins/product/category'
// import VCascader from '@/baseComponents/VCascader/VCascader'
export default {
  name: 'CategoryFilter',
  // components: { VCascader },
  mixins: [categoryMixins],
  props: {
    categoryFormTitle: {
      type: String,
      default: ''
    },
    categoryDialog: {
      type: Boolean,
      default: false
    },
    selectEditId: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
      default: ''
    }
  },
  data () {
    return {
      valid: false,
      categoryFilter: {
        query: ''
      },
      categoryForm: {
        name: '',
        description: '',
        status: 'ACTIVE',
        id: null
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    searchHandle () {
      this.getData(this.categoryFilter)
    },
    createAdminUserHandler () {
      this.$emit('create')
    },
    closeEditFormHandler () {
      this.categoryForm = {
        name: '',
        description: '',
        id: null,
        status: 'ACTIVE'
      }
      this.$refs.form.resetValidation()
      this.$emit('close')
    },
    saveEditFormHandler () {
      this.$refs.form.validate()
      if (!this.valid) {
        return
      }
      this.$emit('save', this.cloneObj(this.categoryForm))
    }
  }
}
</script>
