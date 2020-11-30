<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Layout from '@layouts/main'
import TaskItem from '@components/spider/task-item'
import Loading from 'vue-loading-overlay'
import TaskListItem from '@components/spider/task-list-item'

import 'vue-loading-overlay/dist/vue-loading.css'

/**
 * TasksController component
 */
export default {
  page: {
    title: 'Tasks'
  },
  components: {
    VuePerfectScrollbar,
    Layout,
    TaskItem,
    Loading,
    TaskListItem
  },
  data() {
    return {
      websock: null,
      searchData: "",
      taskData:[],
      isLoading: false,
      // taskData:[{
      //   fid:"81d876f01b404ea983012293e4ac6bdc",
      //   id: "c84bdb7bcef14772a797372af92c0ac7",
      //   url:"https://vimeo.com/76979871",
      //   domain:"youtube.com",
      //   type: "info",
      //   create_time: 1606120037,
      //   update_time: 1706120037,
      //   state:"waiting",
      //   sub_tasks: {
      //     "f15bbd3fa5044dfbb7692bdc15e98e1a": {
      //       state: "waiting",
      //       type: "media"
      //     },
      //     "40a676c4bbd544efba9df4472af7a272": {
      //       state: "running",
      //       type: "list"
      //     },
      //     "40a676c4bbd544efba9df4472af7a292": {
      //       state: "done",
      //       type: "info"
      //     },
      //   }
      // }]

    }
  },
  created() {

    this.initWebSocket()

  },
  destroyed() {

    this.websock.close()

  },
  methods: {

    toCreateTasks() {

      const vm = this

      vm.isLoading = true

      this.$request.post('/task', {
        url: this.searchData
      })
      .then((res) => {
        // 请求成功
        vm.isLoading = false
        
        if(res.data.code === 1){

          console.log('添加成功')
          
          vm.searchData = ""
          vm.$noty.success(res.data.msg)

        }else{

          vm.$noty.warning(res.data.msg)

        }

      })
      .catch((err) => {

        console.log(err)

        vm.isLoading = false
        vm.$noty.error('error')

      })

    },
    // 初始化websocket
    initWebSocket() {

      const wsuri = process.env.VUE_APP_WS_URL + "/tasks"
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose

    },

    // 连接建立之后执行send方法发送数据
    websocketonopen() { 
      
    },

    // 连接建立失败重连
    websocketonerror() {

      this.initWebSocket()

    },

    // 数据接收
    websocketonmessage(res) {

      const vm = this
      const message = JSON.parse(res.data)

      this.isLoading = false
      if(message.code === 1) {

        this.taskData = message.data
        
      }
    },

    // 数据发送
    websocketsend(data) {

      this.websock.send(data)

    },

    // 关闭
    websocketclose(e) {

      console.log('websocket error, ',e)

    },
    
  }
}
</script>

<template>
  <Layout>
    <VuePerfectScrollbar>
    <div class="row mt-2 mb-2 p-2">
      <b-form-input
        v-model="searchData"
        class="col-12"
        placeholder="Some text value..."
        type="url"
        @keyup.enter="toCreateTasks"
      ></b-form-input>
    </div>

    <div class="row">
      <loading :active.sync="isLoading" loader="dots" color="#5369f8" :is-full-page="false"></loading>
      <!-- <TaskItem v-for="(task, index) in taskData" :task="task"/> -->
      <TaskListItem v-for="(task, index) in taskData" :key="task.id" :task="task"/>
    </div>

    <div v-if="this.taskData.length === 0" class="text-center">
      <p>系统已运行时长
        <span class="font-size-18 font-weight-bold text-primary"> 14 </span>天，
      </p>
      <p>
        可采集网站
        <span class="font-size-18 font-weight-bold text-primary">
          <a href="https://www.youtube.com/" target="_blank">
            Youtube
          </a>
        </span>、
        <span class="font-size-18 font-weight-bold text-primary">
          <a href="https://twitter.com/" target="_blank">
            Twitter
          </a>
        </span>、
        <span class="font-size-18 font-weight-bold text-primary">
          <a href="https://www.flickr.com/" target="_blank">
            Flickr
          </a>
        </span>、
        <span class="font-size-18 font-weight-bold text-primary">
          <a href="https://clyp.it/" target="_blank">
            clyp.it
          </a>
        </span>、
        <span class="font-size-18 font-weight-bold text-primary">
          <a href="https://vimeo.com/" target="_blank">
            Vimeo
          </a>
        </span>，
      </p>
      <p>
        已采集视频
        <span class="font-size-18 font-weight-bold text-primary"> 154 </span>个，采集音频
        <span class="font-size-18 font-weight-bold text-primary"> 146 </span>个，采集图片
        <span class="font-size-18 font-weight-bold text-primary"> 288 </span>个。
      </p>
    </div>
    </VuePerfectScrollbar>
  </Layout>
</template>
<style type="text/css">
body {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
body::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>