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
        'youtube.com': require('@assets/images/brands/youtube.svg'),
        'twitter.com': require('@assets/images/brands/twitter.svg'),
        'vimeo.com': require('@assets/images/brands/vimeo.svg'),
        'flickr.com': require('@assets/images/brands/flickr.svg'),
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
  <div class="col-12 pl-2 pr-2">
    <div class="card mb-3">
      <!-- 主任务 -->
      <div class="card-body p-3">

        <span class="text-success font-size-13 mb-2 overflow-text">
          {{ id }}
        </span>
        
        <div class="row">

          <div class="col-xl-6 col-lg-8 col-md-8 col-sm-10 col-xs-10 overflow-text">
            <span class="url font-size-18 mr-2">
              <a :href="task.url" target="_blank">{{ url }}</a>
            </span>
          </div>

        </div>
        
        <div class="d-flex align-items-center">
          <div class="badge float-right text-uppercase mr-3"
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
          <!-- <div class="col-2 text-success"> -->
          <div class="text-success mr-3">
            <!-- 创建时间 -->
            <i class="uil uil-schedule font-18 mr-1"></i>
            <span class="mt-1 font-size-14 time">{{ create_time | moment("from", "now") }}</span>
          </div>
          <div v-if="fid!==''" class="text-info overflow-text mr-3">
            <!-- fid -->
            <i class="uil uil-cloud-database-tree font-18 mr-1"></i>
            <span class="mt-1 font-size-14">{{ fid }}</span>
          </div>
          <div class="text-primary mr-3">
            <!-- domain -->
            <i class="uil uil-cloud-download font-18 mr-1"></i>
            <span class="mt-1 font-size-14">{{ domain }}</span>
          </div>
        </div>
      </div>
      <!-- 子任务 -->
      <div v-if="!this.$_.isEmpty(sub_tasks)" class="card-body border-top row">
        <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12" v-for="(isSubTaskCompleted, subTaskId) in sub_tasks">
          <div
            :key="subTaskId"
            class="card mb-2 shadow-none border"
          >
            <div class="p-1 px-2">
              <div class="row align-items-center">
                <div class="col-auto">
                  <i class="uil-file-plus-alt font-size-18"></i>
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