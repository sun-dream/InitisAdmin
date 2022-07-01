<template>
  <div class="d-flex scroll-root-container" v-if="dataSize > 0">
    <v-fab-transition>
      <v-btn
        class="float-btn"
        v-show="scrollBarControl.showLeft"
        fab
        outlined
        absolute
        left
        @click="swipeLeft()"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-fab-transition>
    <div class="scroller-container w-100" :class="'scroller-container-wrap'+clsKey">
      <div class="d-flex pa-0 mx-0 my-1"
           :style="`width:${(dataSize*itemWidth)+'px'}`" v-on:scroll.passive="handleScroll">
        <v-card
          v-for="index in dataSize"
          :key="index"
          :flat="flat"
          class="pa-0 scroll-item-wrap"
          :class="mxClass+(flexCenter?' d-flex align-content-center flex-wrap':'')"
          :width="itemWidth"
        >
              <slot :index="index-1"/>
        </v-card>
      </div>
    </div>
    <v-fab-transition>
      <v-btn
        class="float-btn"
        v-show="scrollBarControl.showRight"
        fab
        outlined
        absolute
        right
        @click="swipeRight()"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
export default {
  name: "VScrollView",
  props: {
    clsKey:{
      type:String|Number,
      default:''
    },
    flat:{
      type:Boolean,
      default:false
    },
    flexCenter:{
      type:Boolean,
      default:false
    },
    dataSize:{
      type:Number,
      default:0
    },
    itemWidth:{
      type:Number,
      default:250
    },
    mxClass:{
      type:String,
      default:'mx-3'
    }
  },
  data() {
    return {
      scrollBarControl: {showLeft:false , showRight: false},
    }
  },

  mounted() {
    if (typeof window === 'undefined') return
    window.addEventListener('scroll', this.handleScroll, true)
    window.addEventListener('resize', this.scrollBarChange, { passive: true })
    let content = document.querySelector(".scroller-container-wrap"+this.clsKey);
    if(!content || this.dataSize === 0){
      return
    }
    this.scrollBarControl.showLeft = false
    this.scrollBarControl.showRight = this.dataSize*this.itemWidth > content.clientWidth
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.scrollBarChange, { passive: true })
  },
  methods: {
    handleScroll(event) {
      this.scrollBarChange()
    },
    scrollBarChange(){
      const content =  document.querySelector(".scroller-container-wrap"+this.clsKey);
      if(content===null){
        return
      }
      if(this.scrollBarControl.showRight){
        if(content.scrollWidth === content.scrollLeft+content.clientWidth){
          this.scrollBarControl.showLeft = content.scrollLeft!==0
          this.scrollBarControl.showRight = false
        }
      }else if(this.scrollBarControl.showLeft){
        if(content.scrollLeft===0){
          this.scrollBarControl.showLeft = false
          this.scrollBarControl.showRight = content.scrollWidth>content.clientWidth
        }
      }else if(content.scrollWidth > content.clientWidth){
          this.scrollBarControl.showLeft = false
          this.scrollBarControl.showRight = content.scrollLeft===0
      }
    },
    scrollTo(element, scrollPixels, duration) {
      const scrollPos = element.scrollLeft;
      // Condition to check if scrolling is required
      if (!((scrollPos === 0 || scrollPixels > 0) && (element.clientWidth + scrollPos === element.scrollWidth || scrollPixels < 0))) {
        // Get the start timestamp
        const startTime =
          "now" in window.performance
            ? performance.now()
            : new Date().getTime();

        function scroll(timestamp) {
          //Calculate the timeelapsed
          const timeElapsed = timestamp - startTime;
          //Calculate progress
          const progress = Math.min(timeElapsed / duration, 1);
          //Set the scrolleft
          element.scrollLeft = scrollPos + scrollPixels * progress;
          //Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
          if (timeElapsed < duration) {
            //Request for animation
            window.requestAnimationFrame(scroll);
          } else {
            return;
          }
        }

        //Call requestAnimationFrame on scroll function first time
        window.requestAnimationFrame(scroll);
      }
    },
    swipeLeft() {
      const content = document.querySelector(".scroller-container-wrap"+this.clsKey);
      this.scrollTo(content, -content.clientWidth, 300);
    },
    swipeRight() {
      const content = document.querySelector(".scroller-container-wrap"+this.clsKey);
      this.scrollTo(content, content.clientWidth, 300);
    }
  }
}
</script>

<style scoped >
@import "./assets/sass/color";

.scroller-container {
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.scroller-container::-webkit-scrollbar {
  height: 0 !important;
  width: 0 !important;
  background: transparent; /* make scrollbar transparent */
}

.scroll-root-container {
  position: relative;
  justify-content: center;
  align-items: center;
}

.v-card {
  color: transparent;
  text-align: center;
  text-decoration: none;
}
.scroll-item-wrap{
  overflow:hidden;
  position: relative;
  padding-bottom: 24px;
  
}
.download-wrap{
    position: absolute;
    bottom: 0;
    left: 0;
    background: #fff;
  }
.float-btn {
  position: absolute;
  /* color: $color-text-regular; */
  margin: auto;
  top: 0;
  bottom: 0;
  display: block;
  background-color: white;
}

</style>
