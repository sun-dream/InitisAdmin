<!--官网: https://videojs.com/ -->
<!--文档地址:https://docs.videojs.com/  -->
<template>
  <video
    :ref="'videoPlayer'+src"
    class="video-js vjs-default-skin vjs-big-play-centered"
    data-setup="{&quot;language&quot;:&quot;en-us&quot;}"
  />
  <!-- <video :id="'videoPlayer'+src" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="none" /> -->
</template>
<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'
// eslint-disable-next-line no-unused-vars
export default {
  name: 'VVideoPlayer',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    src: { type: String }
  },
  data () {
    return {
      player: null,
      defaultOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        controls: true,
        preload: 'metadata', // 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'en',
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{ src: '', type: 'video/mp4' }],
        // width: document.documentElement.clientWidth,
        notSupportedMessage: 'This video is temporarily unavailable, please try again later!', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  computed: {
    VideoOptions () {
      const option = this.cloneObj(this.defaultOptions)
      option.sources[0].src = this.src
      return option
    }
  },
  watch: {
    // src (newData, oldData) {
    //   if (newData && this.player) {
    //     this.player.src(newData)
    //   } else {
    //     this.player.src('')
    //   }
    // }
  },
  mounted () {
    this.init(this.src)
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    init (src) {
      setTimeout(() => {
        this.$nextTick(() => {
          const refName = 'videoPlayer' + this.src
          this.player = videojs(this.$refs[refName], this.options, function onPlayerReady () {
            // console.log('onPlayerReady', this);
          })
          // this.player.src(src)
        })
      }, 300)
    }
    // initDom () {
    //   const dom = ` <video
    //                   ref="videoPlayer${this.src}"
    //                   class="video-js vjs-default-skin vjs-big-play-centered"
    //                   data-setup="{&quot;language&quot;:&quot;en-us&quot;}"
    //               />`
    //   return dom
    // }
    // startToPlay () {
    //   this.player.play()
    // },
    // stopPlay () {
    // },
    // reset () {
    //   this.player.pause()
    //   this.player.hasStarted(false)
    // }
  }
}
</script>
<style>

</style>
