<script>
import Layout from '@layouts/main'
import MediaCard from '@components/spider/media-card'
import queryString from 'query-string'
import Loading from 'vue-loading-overlay'

import 'vue-loading-overlay/dist/vue-loading.css'

/**
 * Search component
 */
export default {

  page: {
    title: 'Search',
  },

  components: { Layout, MediaCard, Loading },

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
      gutterWidth: 24,
      clientWidth: document.documentElement.clientWidth
    }
  },

  computed: {
    // 单独图表的加载显示
    isChartLoadingShow() {
      return !this.isMediaLoading && this.isChartLoading
    },

    // 图标数据
    series() {
      return [{
        name: 'Download',
        data: this.chartData
      }]
    },

    // 卡片宽度
    itemWidth(){

      return ( this.clientWidth - 120 - this.gutterWidth * ( this.col - 1 )) / this.col

    },

    // 卡片间隔,可以再优化一下，等可以连接远程时再改到data位置
    // gutterWidth(){

    //   return 24

    // }

  },

  mounted() {

    const vm = this

    this.fetchMediaData()
    this.fetchChartData()

    window.onresize = () => {
      return (() => {
          window.screenWidth = document.body.clientWidth
          vm.clientWidth = window.screenWidth
      })()
    }
  },

  methods: {

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
    fetchMediaData() {

      const vm = this
      
      this.isMediaLoading = true

      this.$request.post('/query?' + vm.queryData(''))
      .then((res) => {
        
        vm.isMediaLoading = false

        if(res.data.code === 1){
          
          vm.mediaData.push(...res.data.data)
          vm.$noty.success(res.data.msg)
          
        }else{

          vm.$noty.warning(res.data.msg)

        }

      })
      .catch((err) => {

        vm.isMediaLoading = false
        vm.$noty.error('media error')

      })     
      
    },

    // 请求图表数据
    fetchChartData() {

      const vm = this

      this.isChartLoading = true

      this.$request.post('/query?' + vm.queryData(true))
      .then((res) => {

        vm.isChartLoading = false

        if(res.data.code === 1){

          vm.chartData = res.data.data
          vm.$noty.success(res.data.msg)

        }else{

          vm.$noty.warning(res.data.msg)

        }
      })
      .catch((err) => {

        vm.isChartLoading = false
        vm.$noty.error('chart error')

      })     
      
    },

    // 搜索
    toSearch() {

      this.mediaData = []
      this.fetchMediaData()
      this.fetchChartData()

    },

    // 类型修改
    onInputChange() {
      this.from = 0
      this.toSearch()
    },

    // 选择时间段修改，获取选择时间
    onTimeChange(selectedDates, dateStr, instance) {

      this.from = 0

      if(!isNaN(selectedDates[0]) && !isNaN(selectedDates[1])) {

        this.st = new Date(selectedDates[0]).getTime()
        this.et = new Date(selectedDates[1]).getTime()
        this.toSearch()

      }
    },

    // 加载更多
    loadmore() {

      this.from = this.from + this.size
      this.fetchMediaData()

    },

    // 滚动函数，未来如果需要添加滚动的其他效果可用
    scroll(scrollData) {
      // console.log(scrollData)
    },

    // 瀑布流效果渲染完成
    finish() {
      console.log('完成渲染')
    },

  },

}
</script>

<template>
  <Layout>
    <div class="row justify-content-md-center m-0 mt-3 mb-3">

      <!-- 类型选择 -->
      <div class="col-2 pl-0 pr-3">
        <select class="form-control custom-select" v-model="type" @change="onInputChange">
          <option>video</option>
          <option>audio</option>
          <option>image</option>
        </select>
      </div>

      <!-- ES搜索 -->
      <div class="col-8 pl-0 pr-3">
        <b-form-input
          class="border-light"
          v-model="query"
          placeholder="e.g. mime:video/mp4 AND title:kitty AND platform:youtube"
          @keyup.enter="onInputChange"
        ></b-form-input>
      </div>

      <!-- 时间选择 -->
      <div class="col-2 pl-0 pr-0">
        <flat-pickr
          class="border-light"
          v-model="dateTime"
          placeholder="Select Date Range..."
          :config="dateTimePicker"
          @on-change="onTimeChange"
        ></flat-pickr>
      </div>
    </div>

    <!-- 图表 -->
    <div ref="row" class="row p-0 m-0 mb-4">
      <div class="col-12 p-0 m-0">
        <div class="card mb-0">
          <div class="card-body py-0">

            <loading :active.sync="isChartLoadingShow" loader="dots" color="#5369f8" :is-full-page="false"></loading>
            <apexchart
              type="bar"
              height="100"
              :options="chartOptions"
              :series="series"
            ></apexchart>

          </div>
        </div>
      </div>
    </div>

    <!-- 媒体列表 -->
    <div>
      <loading :active.sync="isMediaLoading" loader="dots" color="#5369f8" :is-full-page="true"></loading>
      <waterfall v-if="mediaData.length !== 0" ref="waterfall" :col="col" :width="itemWidth" :gutterWidth="gutterWidth" :data="mediaData" @loadmore="loadmore" @scroll="scroll" @finish="finish">
        <MediaCard v-for="media in mediaData" :key="media.id" :media="media" />
      </waterfall>
      <!-- <waterfall v-if="mediaData.length !== 0" ref="waterfall" :col="col" :gutterWidth="gutterWidth" :data="mediaData" @loadmore="loadmore" @scroll="scroll" @finish="finish">
        <MediaCard v-for="media in mediaData" :key="media.id" :media="media" />
      </waterfall> -->
    </div>

    <div v-if="mediaData.length === 0" class="text-center">
      <p>Media library is null.</p>
    </div>
    <!-- <div class="waterfall">
      <MediaCard v-for="(media, index) in mediaData" :media="media._source" />
    </div> -->  
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
/*.waterfall {
  column-count: 4;
  column-gap: 10px;
}*/
/*input{
  border: 1px solid #5369f8!important;
}*/
</style>
