const categoryMixins = {
  data() {
    return {
      categoryVuexBasePath: 'logic/product/category',
      limit: 100,
      skip: 0,
      search: '',
      categoryFormRules: {
        name: [(v) => !!v || "name is required"],
        sort_weight: [(v) => {
          if(parseFloat(v) > 100){
            return '不可大于100'
          }else if(parseFloat(v).toString() === 'NaN' || parseFloat(v) < 0){
            return '不可添加非数字 或者是小于0 的数字'
          }
          return true
        }],
        parent_id: [(v) => !!v || "必须要选择一个分类"]
      },
      statusEnum: {
        ACTIVE: "ACTIVE",
        INACTIVE : "INACTIVE"
      }
    }
  },
  computed: {
    categoryData() {
      return this.$store.getters[this.categoryVuexBasePath + '/categoryData']
    },
    fetching() {
      return this.$store.getters[this.categoryVuexBasePath + '/fetching']
    },
    categoryDataOption() {
      if (this.categoryData.length < 1) {
        return []
      } else {
        return this.cloneObj(this.renderTreeClosure(this.categoryData))
      }
    },
  },
  methods: {
    getTime(val) {
      if (val === "" || !this.isDef(val)) {
        return;
      }
      let d = val.split(".");
      let s = "";
      if (d[0].indexOf("T") > -1) {
        s = d[0].replace(/T/g, " ");
      }
      s = s.split(' ')[0]
      return s;
    },
    renderTreeClosure(data, selectId) {
      // 删除 所有 children,以防止多次调用
      data.forEach(function (item) {
        delete item.children;
        item.disable = false

      });
      // 将数据存储为 以 id 为 KEY 的 map 索引数据列
      let map = {};
      data.forEach(function (item) {
        map[item.id] = item;
      });
      let val = [];
      data.forEach(function (item) {
        if (selectId !== undefined) {
          if (item.id === selectId) {
            item.disable = true
          } else {
            item.disable = false
          }
        }
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.parent_id];
        // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
          val.push(item);
        }
      });
      // console.log(val)
      return val
    },
    getCategoryAllData(params={query:''}){
      this.getCategoryData(params)
      this.getCategoryDataPagination()
    },
    getCategoryData(params={query:''}) {
      this.$store.dispatch(this.categoryVuexBasePath + '/getCategoryData',params)
    },
    getCategoryDataPagination(params={query:''}) {
      this.$store.dispatch(this.categoryVuexBasePath + '/getCategoryPagination', params)
    },
    createdProductCategory(data) {
      return this.$store.dispatch(this.categoryVuexBasePath + '/createdProductCategory', data)
    },
    getCategoryName(val) {
      if (!val) {
        return
      }
      let categoryIndex = null
      for (let index = 0; index < this.categoryData.length; index++) {
        if (this.categoryData[index].id === val) {
          categoryIndex = index
          break
        }
      }
      return categoryIndex === null ? val : this.categoryData[categoryIndex].name
    },
    updateProductCategory({params, categoryId}) {
      return this.$store.dispatch(this.categoryVuexBasePath + '/updateProductCategory', {params, categoryId})
    }
  }
}

export default categoryMixins
