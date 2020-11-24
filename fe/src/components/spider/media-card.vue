<script>
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
  props: {
    username: {
      type: String,
      default: 'username',
    },
    avatar: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: 'title',
    },
    context: {
      type: String,
      default: "Some quick example text to build on the card title and make up the bulk of the card's content. With supporting text below as a natural lead-in to additional content.",
    },
    poster: {
      type: String,
      default: null
    },
    fileUrl:{
      type: String,
      default: null,
    },
    fileType: {
      type: String,
      default: 'video/mp4',
    },
    fileSize: {
      type: Number,
      default: 0
    },
    updateTime: {
      type: Number,
      default: 1606120037,
    },
    source: {
      type: String,
      default: null,
    },
    isEncrypted: {
      type: Boolean,
      default: false,
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
      playerOptions: {
        height: '300',
        // autoplay: true,
        muted: true,
        language: 'zh-CN',
        fluid: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          // mp4
          src: "http://vjs.zencdn.net/v/oceans.mp4",
          // webm
          // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {

  }
}
</script>
<template>

  <div class="media-card">
    <div class="media-card-top">
      <b-img src="https://picsum.photos/900/600/?image=41" fluid alt="Responsive image"></b-img>
      <i v-b-modal.modal-center variant="warning" class="uil uil-play"></i>
    </div>
    <div class="media-card-body">
      <h5 class="card-title font-size-16">{{ title }}</h5>
      <div class="media">
        <img
          src="@assets/images/users/avatar-7.jpg"
          class="avatar-sm rounded-circle mr-2"
          alt="avatar"
        />
        <div class="info-body">
          <h6 class="user-name">{{ username }}</h6>
          <span class="update-time">{{ updateTime | moment('YY/MM/DD HH:mm:ss') }}</span>
          <img class="source" src="@assets/images/brands/Youtube.svg"></img>
        </div>
      </div>
      <p class="context">
        {{ context }}
      </p>
    </div>
    <div class="media-card-footer">
      <span class="fileType mr-2">{{ fileType }}</span>
      <span class="fileSize">
        <i class="uil uil-down-arrow"></i>
        {{ fileSize | gbFilter }}
      </span>
      <span v-show="isEncrypted" class="encrypted">
        Encrypted data detected
      </span>
    </div>
    <b-modal
      id="modal-center"
      centered
      size="lg"
      :title="title"
      title-class="font-18"
      hide-footer
    >
      <b-container fluid>
        <VideoPlayer 
        class="vjs-custom-skin video-player"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true" />
      </b-container>
    </b-modal>
    <div v-show="isEncrypted" class="media-card-overlay"> 
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
  border-style: none;
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
.media-card-body {
  margin: 1rem;
}
.info {
  display: flex;
  align-items: flex-start;
  margin: 2rem 0;
}
.info-body {
  flex: 1;
}
.user-name {
  margin-top: 0;
  margin-bottom: 0;
}
.update-time {
  font-size: 0.6rem;
  color: green;
  margin-top: 0;
  margin-bottom: 0;
}
.source {
  float: right;
  width: 15%;
}
.context {
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  margin-bottom: 0;
}

.media-card-footer {
  margin: 1rem;
  margin-top: 0;
}
.fileType {
  color: #0070c0;
}
.encrypted {
  color: #ff0000;
  float: right;
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
</style>