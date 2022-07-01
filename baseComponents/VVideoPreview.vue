<!--抖音的视频尺寸宽高比例一般为9:16，分辨率为540*960。 也可以使用更高分辨率的视频，例如720/1280、1080/1920等。-->

<template>
  <div class="video-preview">
    <div v-if="src && src.length > 0" class="preview-ratio" @mouseleave="reset">
      <video-player :src="src"
                    :options="options"
                    :ref="'preview'+src"
      ></video-player>
    </div>
    <div v-else>No Video</div>
  </div>
</template>

<script>
import VideoPlayer from "@/baseComponents/VideoPlayer";
export default {
  name: "VVideoPreview",
  components: {VideoPlayer},
  props: {
    src: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      options: {
        playbackRates: null,
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        controls: true,
        preload: 'metadata', // 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'en',
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: this.src, // 路径
            type: 'video/mp4' // 类型
          }
        ],
        // width: document.documentElement.clientWidth,
        notSupportedMessage: 'This video is temporarily unavailable, please try again later!', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true, // 全屏按钮
          progressControl: false,
          volumeMenuButton: false,
          playToggle: false,
        }
      }
    }
  },
  methods: {
    startToPlay () {
      this.$refs['preview' + this.src].startToPlay()
    },
    reset () {
      this.$refs['preview' + this.src].reset()
    }
  }
}
</script>

<style scoped>
  .preview-ratio {
    background-color: black;
    width: 203px;
    height: 360px;
    min-width: 135px;
    min-height: 240px;
  }
</style>
