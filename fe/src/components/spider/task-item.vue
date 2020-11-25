<script>
export default {
  props:{
    taskId: {
      type: String,
      default: 'c84bdb7bcef14772a797372af92c0ac7',
    },
    domain: {
      type: String,
      default: 'vimeo.com',
    },
    type: {
      type: String,
      default: 'Info',
    },
    url: {
      type: String,
      default: 'https://vimeo.com/76979871',
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createTime: {
      type: Number,
      default: 1606120037,
    },
    updateTime: {
      type: Number,
      default: 1706120037,
    },
  }
}
</script>
<template>
  <div class="task-item col-12">
    <div class="col-2">{{ taskId }}</div>
    <div class="col-1">{{ domain }}</div>
    <div class="col-1">{{ type }}</div>
    <div class="col-2">{{ url }}</div>
    <div class="col-2">
      <span class="badge"
      :class="{
        'badge-soft-success': isCompleted,
        'badge-soft-warning': !isCompleted
      }"
      >
        {{ isCompleted ? '完成' : '未完成' }}
      </span>
    </div>
    <div class="col-2 time">
      {{ createTime | moment('YY/MM/DD HH:mm:ss') }}
    </div>
    <div class="col-2 time">
      {{ updateTime | moment('YY/MM/DD HH:mm:ss') }}
    </div>
  </div>	
</template>
<style type="text/css">
.task-item {
  position: relative;
  display: flex;
  flex-direction: row;
  min-width: 0;
  background-color: #fff;
  background-clip: border-box;
  text-align: center;
  border: 0 solid rgba(0, 0, 0, 0.125);
  box-shadow: 0 0.05rem 0.01rem rgba(75, 75, 90, 0.075);
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
}
.time {
  color: #43d39e;
}
</style>