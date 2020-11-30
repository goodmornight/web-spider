<script>
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
  components: { Layout, TaskItem, Loading, TaskListItem },
  data() {
    return {
      websock: null,
      searchData: "",
      // taskData:[],
      isLoading: false,
      taskData:[{
        fid:"81d876f01b404ea983012293e4ac6bdc",
        id: "c84bdb7bcef14772a797372af92c0ac7",
        url:"https://vimeo.com/76979871",
        domain:"youtube.com",
        type: "info",
        create_time: 1606120037,
        update_time: 1706120037,
        sub_tasks: {
          "f15bbd3fa5044dfbb7692bdc15e98e1a": true,
          "40a676c4bbd544efba9df4472af7a272": false,
          "40a676c4bbd544efba9df4472af7a282": false,
          "40a676c4bbd544efba9df4472af7a292": false,
        }
      }]
    }
  },
  created() {
    // this.initWebSocket()
  },
  destroyed() {
    // this.websock.close()
  },
  methods:{
    toCreateTasks(){

      const vm = this
      
      this.$request.post('/task', {
        url: this.searchData
      })
      .then((res) => {
        console.log(res)
        // 请求成功
        if(res.data.code === 1){
          console.log('添加成功')
          vm.isLoading = true
          vm.searchData = ""
          vm.$noty.success(res.data.msg)
        }else{
          vm.$noty.warning(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err)
        vm.$noty.error(err)
      })

    },
    // 初始化websocket
    initWebSocket(){

      const wsuri = process.env.VUE_APP_WS_URL + "/tasks"
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose

    },

    // 连接建立之后执行send方法发送数据
    websocketonopen(){ 
      
    },

    // 连接建立失败重连
    websocketonerror(){
      this.initWebSocket()
    },

    // 数据接收
    websocketonmessage(res){
      const message = JSON.parse(res.data)
      console.log(message)
      this.isLoading = false
      if(message.code === 1){
        this.taskData = []
        this.taskData = message.data
      }
    },

    // 数据发送
    websocketsend(Data){
      this.websock.send(Data)
    },

    // 关闭
    websocketclose(e){
      console.log('websocket error, ',e)
    },
    
  }
}
</script>

<template>
  <Layout>

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
      <TaskListItem v-for="(task, index) in taskData" :task="task"/>
    </div>
    
  </Layout>
</template>
