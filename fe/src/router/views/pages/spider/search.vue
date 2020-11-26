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
      series: [{
        name: '下载量',
        data: [
          [1486684800000, 34],
          [1486771200000, 43],
          [1486857600000, 31], 
          [1486944000000, 43], 
          [1487030400000, 33], 
          [1487116800000, 52],
          [1496684800000, 34],
          [1496771200000, 43],
          [1496857600000, 31],
          [1496944000000, 43],
          [1497030400000, 33],
          [1497116800000, 52],
        ]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          offsetX: -10,
          // offsetY: 5,
          toolbar: {
            show: false
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },

        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          type:'datetime',
          axisBorder: {
            show: false,
          },
          labels: {
            format: 'yy/MM/dd HH:mm',
          }
        },
        yaxis: {
          title: {
            text: 'Total'
          }
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
      mediaData:[]
    }
  },
  computed:{
    
  },
  created() {
    // this.$nextTick(() => {

    // })
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.getMediaData()
    this.getChartData()
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getMediaData() {
      this.isMediaLoading = true
      this.fetchMediaData(this.queryData(false))
    },
    getChartData() {
      this.isChartLoading = true
      this.fetchChartData(this.queryData(true))
    },
    // 格式化请求数据
    queryData(stat) {
      let q = {
        type: this.type || '',
        q: this.query || '',
        st: this.st,
        et: this.et,
        size: this.size,
        from: this.from,
        only_stat: stat
      }
      return queryString.stringify(q)
    },
    // 请求媒体数据
    fetchMediaData(q) {

      const vm = this
      
      this.$request.post('query?', q)
      .then((res) => {
        console.log(res)
        
        if(res.data.code === 1){
          vm.isMediaLoading = false
          vm.mediaData.push(...res.data.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })     
      
    },
    fetchChartData(q) {

      const vm = this
      
      this.$request.post('query?', q)
      .then((res) => {
        console.log(res)
        
        if(res.data.code === 1){
          vm.isChartLoading = false
        }
      })
      .catch((err) => {
        console.log(err)
      })     
      
    },
    // 获取选择时间
    onTimeChange(selectedDates, dateStr, instance) {

      this.st = new Date(selectedDates[0]).getTime()
      this.et = new Date(selectedDates[1]).getTime()

    },
    handleScroll(e){
      const vm = this
      //滚动条滚动距离
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      //窗口可视范围高度
      let clientHeight = document.documentElement.clientHeight
      //文档内容实际高度（包括超出视窗的溢出部分）
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)

      console.log('scrollTop = ' + scrollTop)
      console.log('clientHeight = ' + clientHeight)
      console.log('scrollHeight = ' + scrollHeight)

      if (scrollTop + clientHeight + 5 >= scrollHeight) {
        console.log('已滚至底部')
        this.from = this.from + this.size
        this.getMediaData()
      }
    },    
  },

}
</script>

<template>
  <Layout>

    <div class="row justify-content-md-center m-0 mt-2 mb-2">
      <!-- 类型选择 -->
      <div class="col-1 pl-0 pr-2">
        <select class="form-control custom-select" v-model="type">
          <option>video</option>
          <option>audio</option>
          <option>image</option>
        </select>
      </div>
      <!-- ES搜索 -->
      <div class="col-10 pl-0 pr-2">
        <b-form-input
          placeholder="e.g. mime:video/mp4 AND title:kitty AND platform:youtube"
          v-model="query"
        ></b-form-input>
      </div>  
      <!-- 时间选择 -->
      <div class="col-1 pl-0 pr-0">
        <flat-pickr
          v-model="dateTime"
          :config="dateTimePicker"
          @on-change="onTimeChange"
          placeholder="Select Date Range..."
        ></flat-pickr>
      </div>
    </div>
    <!-- 图表 -->
    <div class="row p-0 m-0 mb-2">
      <div class="col-12 p-0 m-0">
        <div class="card mb-0">
          <div class="card-body pb-0">
            <apexchart type="bar" height="196" :options="chartOptions" :series="series"></apexchart>
            <div v-show="isChartLoading" class="loading-overlay">
              <b-spinner label="Loading..." variant="primary" class="mx-auto"></b-spinner>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 媒体列表 -->
    <div class="row">
      <MediaCard v-for="(media, index) in mediaData" :media="media" />
    </div>
    <div class="row">
      <b-spinner v-show="isMediaLoading" label="Loading..." variant="primary" class="mx-auto"></b-spinner>
    </div>
    
  </Layout>
</template>
<style type="text/css">
  .loading-overlay{
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
</style>
