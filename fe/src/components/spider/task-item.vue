<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
  components: {
    VuePerfectScrollbar
  },
  props:{
    task:{
      type: Object,
      default: () => ({}),
      // default: () => ({
      //   fid:"81d876f01b404ea983012293e4ac6bdc",
      //   id: "c84bdb7bcef14772a797372af92c0ac7",
      //   url:"https://vimeo.com/76979871",
      //   domain:"vimeo",
      //   type: "info",
      //   create_time: 1606120037,
      //   update_time: 1706120037,
      //   sub_tasks: {
      //     "f15bbd3fa5044dfbb7692bdc15e98e1a": true,
      //     "40a676c4bbd544efba9df4472af7a272": false
      //   }
      // }),
    }
  },
  data(){
    return {
      ...this.task,
      icons:{
        'youtube': require('@assets/images/brands/youtube.svg'),
        'twitter': require('@assets/images/brands/twitter.svg'),
        'vimeo': require('@assets/images/brands/vimeo.svg'),
        'flickr': require('@assets/images/brands/flickr.svg'),
        'clyp.it': require('@assets/images/brands/clyp.it.svg'),
      },
      settings: {
        maxScrollbarLength: 60
      },
    }
  }
}
</script>
<template>
  <div class="col-xl-4 col-lg-6 pl-2 pr-2">
    <div class="card">
      <!-- 主任务 -->
      <div class="card-body pb-1">
        <div class="badge float-right text-uppercase"
        :class="{
          'badge-soft-warning':
            `${type}` === 'list',
          'badge-soft-info':
            `${type}` === 'info',
          'badge-soft-success':
            `${type}` === 'media',
        }"
        >
          {{ type }}
        </div>
        <p class="text-success font-size-13 mb-2 overflow-text">
          {{ id }}
        </p>
        <div class="row">

          <div class="col-xl-6 col-lg-8 col-md-8 col-sm-10 col-xs-10 overflow-text">
            <span class="url font-size-18 mr-2">
              <a :href="task.url" target="_blank">{{ url }}</a>
            </span>
            <p v-if="fid!==''" class="text-muted font-size-12 m-0">from <span class="text-info">{{ fid }}</span></p>
          </div>

          <div class="col-xl-6 col-lg-4 col-md-4 col-sm-2 col-xs-2">
            <img class="source" :src="icons[domain]" />
          </div>

        </div>
        
        <div class="row mb-2">

          <div class="col-6">
            <!-- 创建时间 -->
            <p class="mt-2 mb-1 text-muted overflow-text">Created Time</p>
            <div class="media">
              <i class="uil uil-schedule font-18 text-success mr-1"></i>
              <div class="media-body overflow-text">
                <span class="mt-1 font-size-14 time">{{ create_time | moment('YY/MM/DD HH:mm:ss') }}</span>
              </div>
            </div>
          </div>

          <div class="col-6">
            <!-- 更新时间 -->
            <p class="mt-2 mb-1 text-muted overflow-text">Upated Time</p>
            <div class="media">
              <i class="uil uil-schedule font-18 text-success mr-1"></i>
              <div class="media-body overflow-text">
                <span class="mt-1 font-size-14 time">{{ update_time | moment('YY/MM/DD HH:mm:ss') }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!-- 子任务 -->
      <div class="card-body border-top">
        <VuePerfectScrollbar v-if="!this.$_.isEmpty(sub_tasks)" class="scroll-area" :setting="settings">
          <div
            v-for="(isSubTaskCompleted, subTaskId) in sub_tasks"
            :key="subTaskId"
            class="card mb-2 shadow-none border"
          >
            <div class="p-1 px-2">
              <div class="row align-items-center">
                <div class="col-auto">
                  <div class="avatar-sm font-weight-bold mr-3">
                    <span
                      class="avatar-title rounded bg-soft-primary text-primary"
                    >
                      <i class="uil-file-plus-alt font-size-18"></i>
                    </span>
                  </div>
                </div>
                <div class="col pl-0 overflow-text">
                  <a
                    href="javascript:void(0);"
                    class="text-muted"
                    >{{ subTaskId }}</a
                  >
                </div>
                <div class="col-auto">
                  <span class="badge"
                    :class="{
                      'badge-soft-success': isSubTaskCompleted,
                      'badge-soft-warning': !isSubTaskCompleted
                    }"
                  >
                    {{ isSubTaskCompleted ? 'completed' : 'loading' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </VuePerfectScrollbar>
        <div v-else>
          <span class="text-muted"> Sub-task is null.</span>
        </div>
      </div>

    </div>
  </div>
</template>
<style type="text/css">
.overflow-text {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.time {
  color: #43d39e;
}
.url {
  color: #5369f8;
}
.source {
  /*float: right;*/
  width: 1.5rem;
  height: 1.5rem;
}
.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  max-height: 105px;
}
</style>