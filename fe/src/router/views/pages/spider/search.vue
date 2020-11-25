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
      st: this.et - 86400000,
      size: 5,
      from: 1,
      dateTimePicker: {
        mode:'range',
        defaultDate: new Date(),
        dateFormat: 'Y/m/d',
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
          toolbar: {
            show: false
          }
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
          labels: {
            format: 'yy/MM/dd HH:mm',
          }
        },
        yaxis: {
          title: {
            text: '数量'
          }
        },
        fill: {
          opacity: 1
        },

        // tooltip: {
        //   y: {
        //     formatter: function (val) {
        //       return "$ " + val + " thousands"
        //     }
        //   }
        // }
      },
      mediaData:[]
    }
  },
  mounted () {
    this.fetchData(this.queryData(false))
  },
  methods: {
    // 格式化请求数据
    queryData (stat) {
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
    // 请求数据
    fetchData (q) {

      const vm = this
      
      this.$request.post('query?', q)
      .then((res) => {
        console.log(res)
        
        if(res.data.code === 1){
          vm.mediaData = res.data.data
        }
      })
      .catch((err) => {
        console.log(err)
      })
      
    },
    // 获取选择时间
    onTimeChange(selectedDates) {
      this.st = new Date(selectedDates[0]).getTime()
      this.et = new Date(selectedDates[1]).getTime()
    },
  }
}
</script>

<template>
  <Layout>

    <div class="row mt-2 mb-2">
      <!-- 类型选择 -->
      <select class="col-lg-1 mr-2 form-control custom-select" v-model="type">
        <option>video</option>
        <option>audio</option>
        <option>image</option>
      </select>
      <!-- ES搜索 -->
      <b-form-input
        class="col-lg-3 col-md-6 col-sm-12 mr-2"
        id="input-horizontal"
        placeholder="ES搜索"
        v-model="query"
      ></b-form-input>
      <!-- 时间选择 -->
      <flat-pickr
        v-model="dateTime"
        :config="dateTimePicker"
        class="col-lg-3 col-md-6 col-sm-12 form-control"
        placeholder="选择时间段"
        @on-change="onTimeChange"
      ></flat-pickr>
    </div>
    <!-- 图表 -->
    <div class="row">
      <div class="col-12">
        <apexchart type="bar" height="150" :options="chartOptions" :series="series"></apexchart>
      </div>
    </div>
    <!-- 媒体列表 -->
    <div class="row">
      <MediaCard v-for="(media, index) in mediaData" :media="media"/>
    </div>

  </Layout>
</template>
