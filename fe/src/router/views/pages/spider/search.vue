<script>
import Layout from '@layouts/main'
import MediaCard from '@components/spider/media-card'
import queryString from 'query-string'

/**
 * Search component
 */
export default {
  page: {
    title: 'Search',
  },
  components: { Layout, MediaCard },
  data() {
    return {
      col: 4,
      type: 'video',
      query: '',
      et: new Date().getTime(),
      st: new Date().getTime() - 86400000,
      size: 12,
      from: 0,
      isMediaLoading: false,
      isChartLoading: false,
      dateTimePicker: {
        mode:'range',
        defaultDate: [new Date()-86400000, new Date()],
        altInput: true,
        altFormat: "y/m/d",
        dateFormat: 'Y/m/d',
        locale: {
          rangeSeparator: ' - '
        }
      },
      dateTime: null,
      chartOptions: {
        chart: {
          type: 'bar',
          width: 100,
          height: 80,
          // height: 350,
          // offsetX: -10,
          // offsetY: -5,
          toolbar: {
            show: false
          },
          parentHeightOffset: 0
          // sparkline: {
          //   enabled: true
          // },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '100%',
            // endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },

        stroke: {
          show: true,
          width: 2,
          curve: 'smooth',
          colors: ['transparent']
        },
        xaxis: {
          type:'datetime',
          axisBorder: {
            show: false,
          },
          labels: {
            minHeight:10,
            format: 'MM/dd HH:mm',
          }
        },
        yaxis: {
          show: false
          // title: {
          //   text: 'Total'
          // }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          theme: 'dark',
          x: { show: false },
        },
        legend: {
          show: false,
        },
      },
      mediaData:[],
      chartData:[],
      isBottom: false
    }
  },
  computed:{
    // 图标数据
    series() {
      return [{
        name: 'Download',
        data: this.chartData
      }]
    },
    // 卡片宽度
    itemWidth(){
      console.log(document.documentElement.clientWidth)
      // return (138*0.5*(document.documentElement.clientWidth/375))
      // return (138*0.45*(document.documentElement.clientWidth/375))
      return (document.documentElement.clientWidth-120-this.gutterWidth*(this.col-1))/this.col
    },
    // 卡片间隔
    gutterWidth(){
      // return (9*0.5*(document.documentElement.clientWidth/375))
      // return (9*0.6*(document.documentElement.clientWidth/375))
      console.log(this.$refs.row)
      return 24
    }
  },
  created() {
    // this.$nextTick(() => {

    // })
  },

  mounted() {
    // window.addEventListener('scroll', this.handleScroll)
    this.getMediaData()
    this.getChartData()
  },

  beforeDestroy(){
    // window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {

    // 获取媒体数据
    getMediaData() {
      this.isMediaLoading = true
      this.fetchMediaData()
    },

    // 获取图表数据
    getChartData() {
      this.isChartLoading = true
      this.fetchChartData()
    },

    // 格式化请求数据
    queryData(stat) {
      let q = {
        type: this.type || '',
        q: this.query || '',
        st: parseInt(this.st/1000),
        et: parseInt(this.et/1000),
        size: this.size,
        from: this.from,
        only_stat: stat
      }
      return queryString.stringify(q)
    },

    // 请求媒体数据
    fetchMediaData() {

      const vm = this

      let query = {
        type: this.type || '',
        q: this.query || '',
        st: parseInt(this.st/1000),
        et: parseInt(this.et/1000),
        size: this.size,
        from: this.from,
      }
      console.log(query)

      this.$request.post('/query?' + queryString.stringify(query))
      .then((res) => {
        console.log(res)
        vm.isMediaLoading = false
        if(res.data.code === 1){
          
          vm.$noty.success(res.data.msg)
          vm.mediaData.push(...res.data.data)
        }else{
          // vm.mediaData = []
          vm.$noty.warning(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })     
      
    },

    // 请求图表数据
    fetchChartData() {

      const vm = this

      let query = {
        type: this.type || '',
        q: this.query || '',
        st: parseInt(this.st/1000),
        et: parseInt(this.et/1000),
        only_stat: true
      }

      console.log(query)
      this.$request.post('/querys?' + queryString.stringify(query))
      .then((res) => {
        console.log(res)
        
        if(res.data.code === 1){
          vm.isChartLoading = false
          vm.chartData = res.data.data
          vm.$noty.success(res.data.msg)
        }else{
          vm.$noty.warning(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })     
      
    },

    // 选择时间段修改，获取选择时间
    onTimeChange(selectedDates, dateStr, instance) {

      this.st = new Date(selectedDates[0]).getTime()
      this.et = new Date(selectedDates[1]).getTime()
      this.toSearch()

    },

    // 处理
    handleScroll(e){
      // 滚动条滚动距离
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 窗口可视范围高度
      let clientHeight = document.documentElement.clientHeight
      // 文档内容实际高度（包括超出视窗的溢出部分）
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)

      // console.log('scrollTop = ' + scrollTop)
      // console.log('clientHeight = ' + clientHeight)
      // console.log('scrollHeight = ' + scrollHeight)

      if (scrollTop + clientHeight + 5 >= scrollHeight) {
        console.log('已滚至底部')
        this.isBottom = true 
      }else{
        this.isBottom = false
      }

      if(this.isBottom){
        this.from = this.from + this.size
        this.getMediaData()
        this.isBottom = false
      }
    }, 

    // 搜索
    toSearch() {
      this.mediaData = []
      this.getMediaData()
      this.getChartData()
    },
    loadmore() {
      this.from = this.from + this.size
      this.getMediaData()
    },
    scroll(scrollData) {
      // console.log(scrollData)
    },
    finish() {
      console.log('完成渲染')
    }
  },

}
</script>

<template>
  <Layout>
    <div class="row justify-content-md-center m-0 mt-3 mb-3">
      <!-- 类型选择 -->
      <div class="col-2 pl-0 pr-3">
        <select class="form-control custom-select" v-model="type" @change="toSearch">
          <option>video</option>
          <option>audio</option>
          <option>image</option>
        </select>
      </div>
      <!-- ES搜索 -->
      <div class="col-8 pl-0 pr-3">
        <b-form-input
          placeholder="e.g. mime:video/mp4 AND title:kitty AND platform:youtube"
          v-model="query"
          @keyup.enter="toSearch"
        ></b-form-input>
      </div>  
      <!-- 时间选择 -->
      <div class="col-2 pl-0 pr-0">
        <flat-pickr
          v-model="dateTime"
          :config="dateTimePicker"
          @on-change="onTimeChange"
          placeholder="Select Date Range..."
        ></flat-pickr>
      </div>
    </div>
    <!-- 图表 -->
    <div ref="row" class="row p-0 m-0 mb-4">
      <div class="col-12 p-0 m-0">
        <div class="card mb-0">
          <div class="card-body py-0">
            <apexchart
              type="bar"
              height="100"
              :options="chartOptions"
              :series="series"
            ></apexchart>
            <div v-show="isChartLoading" class="loading-overlay">
              <b-spinner label="Loading..." variant="primary" class="mx-auto"></b-spinner>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 媒体列表 -->
    <!-- <div class="row">
      <MediaCard v-for="(media, index) in mediaData" :media="media._source" />
    </div> -->
    <waterfall ref="waterfall" :col="col" :width="itemWidth" :gutterWidth="gutterWidth" :data="mediaData" @loadmore="loadmore" @scroll="scroll" @finish="finish">
      <MediaCard v-for="(media, index) in mediaData" :media="media" />
    </waterfall>
    <!-- <div class="waterfall">
      <MediaCard v-for="(media, index) in mediaData" :media="media._source" />
    </div> -->

    <div class="row">
      <b-spinner v-show="isMediaLoading" label="Loading..." variant="primary" class="mx-auto"></b-spinner>
    </div>
    
  </Layout>
</template>
<style type="text/css">
.loading-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 0.25rem;
}
.waterfall {
  column-count: 4;
  column-gap: 10px;
}
</style>
