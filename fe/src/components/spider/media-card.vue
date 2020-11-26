<script>
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
  props: {
    media: {
      type: Object,
      default: null
    }
  },
  components: {
    'VideoPlayer': videoPlayer
  },
  filters:{
    // 计算机存储数值换算,默认传进来的最小单位为MB
    gbFilter (value) {

      if (value === 0) return '0 MB'
 
      const k = 1024
      const sizes = ['MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      let i = Math.floor(Math.log(value) / Math.log(k))

      return (value / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
    },
  },
  data(){
    return {
      ...this.media,
      defaultThumbnail: 'https://picsum.photos/900/600/?image=41',
      icons:{
        'youtube': require('@assets/images/brands/youtube.svg'),
        'twitter': require('@assets/images/brands/twitter.svg'),
        'vimeo': require('@assets/images/brands/vimeo.svg'),
        'flickr': require('@assets/images/brands/flickr.svg'),
        'clyp.it': require('@assets/images/brands/clyp.it.svg'),
      },
      // playerOptions: {
      //   height: '300',
      //   // autoplay: true,
      //   muted: true,
      //   language: 'zh-CN',
      //   fluid: true,
      //   playbackRates: [0.7, 1.0, 1.5, 2.0],
      //   sources: [{
      //     type: "video/mp4",
      //     // mp4
      //     src: "http://vjs.zencdn.net/v/oceans.mp4",
      //     // webm
      //     // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
      //   }],
      //   poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
      //   notSupportedMessage: '此视频暂无法播放，请稍后再试',
      // }
    }
  },
  computed: {
    isEncrypted(){
      return this.hidden_info.length !== 0
    },

    player(){
      return this.$refs.videoPlayer.player
    },

    playerOptions(){
      return {
        height: '300',
        muted: true,
        language: 'zh-CN',
        fluid: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: this.mime,
          src: this.url,
        }],
        poster: this.thumbnail_url,
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
      }
    }
  },
  methods: {
    // 显示Modal
    showModal(){
      this.$refs.modal.show()
    }
  }
}
</script>
<template>
<div class="col-xl-2 col-lg-3 col-md-6 col-sm-12">
  <div class="media-card">
    <!-- 卡片头部信息 -->
    <div class="media-card-top">
      <b-img
        :src="`${ thumbnail_url === ''? defaultThumbnail : thumbnail_url }`"
        :alt="file_name"
        fluid
      ></b-img>
      <i v-if="type!=='image'" variant="warning" class="uil uil-play" @click="showModal"></i>
    </div>
    
    <div class="position-relative">
      <!-- 卡片中间用户/来源等信息 -->
      <div class="media-card-body">
        <h5 class="media-title">{{ title }}</h5>
        <div class="d-flex flex-row align-self-center">
          <img
            class="avatar-sm rounded-circle mr-2"
            :src="`${ author_avatar }`"
            :alt="`${ author }`"
          />
          <div class="info-body d-flex flex-column align-self-center">
            <span class="author">{{ author }}</span>
            <span class="update-time">{{ update_time | moment('YY/MM/DD HH:mm:ss') }}</span>
          </div>
          <img class="source" :src="icons[domain]" />
        </div>
        <p class="content ml-auto">
          {{ content }}
        </p>
      </div>
      <!-- 卡片底部文件类型和版权信息 -->
      <div class="media-card-footer">
        <span class="fileType">{{ mime }}</span>
        <span class="fileSize">
          <i class="uil uil-down-arrow"></i>
          {{ file_size | gbFilter }}
        </span>
        <span v-show="isEncrypted" class="ml-auto encrypted">
          Encrypted data detected
        </span>
        <div v-show="isEncrypted" class="media-card-overlay"> 
        </div>
      </div>

    </div>
    
    <!-- 视频、音频弹出框 -->
    <b-modal
      ref="modal"
      centered
      size="lg"
      :title="file_name"
      title-class="font-18"
      header-class="d-none"
      content-class="border-0"
      body-class="p-0"
      hide-footer
    >
      <VideoPlayer 
      class="vjs-custom-skin video-player"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true" />
    </b-modal>
    
  </div>
</div>
</template>
<style type="text/css">
.media-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  box-shadow: 0 0.05rem 0.01rem rgba(75, 75, 90, 0.075);
  border-radius: 0.25rem;
  margin-bottom: 2rem;
}
.media-card-top {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.media-card-top img {
  vertical-align: middle;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.media-card-top i {
  position: absolute;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  color: #fff;
  font-size: 3.5rem;
  border-style: none;
}
.media-title{
  font-size: 18px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  margin-top: 0;
  margin-bottom: 0.8rem;
}
.media-card-body {
  margin: 1rem 1rem 0 1rem;
}
.info {
  display: flex;
  align-items: flex-start;
  margin: 2rem 0;
}
.info-body {
  flex: 1;
}
.author {
  font-size: 16px;
  line-height: 1rem;
  /*margin-top: 0;
  margin-bottom: 0;*/
}
.update-time {
  font-size: 0.6rem;
  color: green;
  margin-top: 0;
  margin-bottom: 0;
}
.source {
  /*float: right;*/
  width: 1.5rem;
}
.content {
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  margin-bottom: 0;
}

.media-card-footer {
  display: flex;
  max-width: 100%;
  margin: 0.3rem 1rem 0.8rem 1rem;
  /*margin-top: 0;*/
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.fileType {
  color: #0070c0;
  margin-right: 1rem;
}
.fileSize {
  margin-right: 1rem;
}
.encrypted {
  color: #ff0000;
  /*float: right;
  text-align: right;*/
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.video-player div {
  margin: 0 auto;
}
.video-player .vjs-big-play-button{
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.media-card-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 217, 102, 0.35);
  border-radius: 0.25rem;
}
.media-body-class {
  padding: 0;
}
/*.model-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}*/
</style>