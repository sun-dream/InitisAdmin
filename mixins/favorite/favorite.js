const productFavoriteMixins = {
  data(){
    return{
      favoriteVuexBasePath:'logic/favorite',
      statusArray: [
        { name: 'favorited', value: 'FAVORITED' },
        { name: 'cancelld', value: 'CANCELLED' },
      ],
      btnAddFavoriteText:'Add to favorites',
      btnCancelFavoriteText:'Unfavorite',
    }
  },
  computed: {
    favoriteStatus:{
      get(){
        return this.$store.getters[this.favoriteVuexBasePath + '/favoriteStatus']
      },
      set(val){
        this.$store.commit(this.favoriteVuexBasePath+'/UPDATA_FAVORITE_STATUS', val)
      }
    },
    favoriteList() {
      return this.$store.getters[this.favoriteVuexBasePath + '/favoriteList']
    }
  },
  methods: {
    updateFavoriteStatus({newStatus,productId}){
      return this.$store.dispatch(this.favoriteVuexBasePath + '/updateFavoriteStatus',{newStatus,productId})
    },
    loadFavoriteList(){
      return this.$store.dispatch(this.favoriteVuexBasePath + '/loadFavoriteList',{})
    }
  }
}

export default productFavoriteMixins
