<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import TaskItem from '@components/spider/task-item'

/**
 * TasksController component
 */
export default {
  page: {
    title: 'Tasks'
  },
  components: { Layout, TaskItem },
  data() {
    return {
      
    }
  },
}
</script>

<template>
  <Layout>
    <div class="row mt-2">
      <b-form-input
        class="col-xl-12 col-lg-12 col-md-12 col-sm-12"
        value="Some text value..."
      ></b-form-input>
    </div>
    <div class="row mt-4">
      <span class="col-2">任务ID</span>
      <span class="col-1">来源</span>
      <span class="col-1">类型</span>
      <span class="col-2">URL</span>
      <span class="col-2">状态</span>
      <span class="col-2">创建时间</span>
      <span class="col-2">更新时间</span>
    </div>
    <div class="row">
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
    </div>
    
  </Layout>
</template>
