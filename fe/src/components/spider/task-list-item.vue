<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import moment from 'vue-moment'
export default {

  components: {
    VuePerfectScrollbar
  },

  props: {
    task: {
      type: Object,
      default: () => ({}),
    }
  },

  data() {
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
  },
}
</script>
<template>

  <transition name="fade">

    <div class="col-12 pl-2 pr-2">
      <div class="card mb-2"
        :class="{
          'main-task-border': `${ fid }` === ''
        }"
      >

        <div class="card-body py-2">
          <div class="row d-flex align-items-center">

            <div class="col-1">
              <div class="badge text-uppercase"
              :class="{
                'badge-soft-info': `${type}` === 'list',
                'badge-soft-danger': `${type}` === 'media',
                'badge-soft-success': `${type}` === 'info',
              }"
              >
                {{ type }}
              </div>
            </div>

            <div class="col-2 overflow-text">
              <img class="source" :src="icons[domain]" />
              <span class="ml-2">{{ domain }}</span>
            </div>

            <div class="col-3 text-success overflow-text consolas-text">
              {{ id }}
            </div>

            <div class="col-3 overflow-text">
              <span class="url">
                <a :href="task.url" target="_blank">
                  {{ url }}
                </a>
              </span>
            </div>

            <div class="col-1">
              <div class="badge text-uppercase"
              :class="{
                'badge-soft-info': `${state}` === 'running',
                'badge-soft-warning': `${state}` === 'waiting',
                'badge-soft-success': `${state}` === 'done',
              }"
              >
                {{ state }}
              </div>
            </div>

            <div class="col-2 overflow-text">
              <span class="mt-1 font-size-14 float-right time">
                {{ create_time | moment('MM/DD HH:mm:ss') }}
              </span>
            </div>

          </div>
        </div>

        <div v-if="sub_tasks.length !== 0" class="card-body row pt-0 pb-0">
          <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="(subTask, subTaskId) in sub_tasks" :key="subTaskId">
            <div
              :key="subTaskId"
              class="card shadow-none border mb-2"
              :class="`${'sub-task-' + subTask.type }`"
            >
              <div class="p-1 px-2">
                <div class="row align-items-center">
                  <div class="col overflow-text">
                    <i class="uil-file-plus-alt font-size-16"></i>
                    <span>
                      {{ subTaskId }}
                    </span>
                  </div>
                  <div class="col-auto">
                    <span class="badge text-uppercase"
                      :class="{
                        'badge-soft-info': `${ subTask.state }` === 'running',
                        'badge-soft-warning': `${ subTask.state }` === 'waiting',
                        'badge-soft-success': `${ subTask.state }` === 'done',
                        'badge-soft-primary': `${ subTask.state }` === 'all_done',
                      }"
                    >
                      {{ subTask.state }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      
    </div>

  </transition>

</template>
<style type="text/css">
.consolas-text {
  font-family: consolas;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

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
.main-task-border {
  border: 1px solid #5369f8;
}
.sub-task-list {
  color: #25c2e3;
  border-color: rgba(37, 194, 227, 0.15);
  background-color: rgba(37, 194, 227, 0.15);
}
.sub-task-info {
  color: #43d39e;
  border-color: rgba(67, 211, 158, 0.15);
  background-color: rgba(67, 211, 158, 0.15);
}
.sub-task-media {
  color: #ff5c75;
  border-color: rgba(255, 92, 117, 0.15);
  background-color: rgba(255, 92, 117, 0.15);
}
</style>