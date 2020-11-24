<script>
import Layout from '@layouts/main'
import MediaCard from '@components/spider/media-card'

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
      selectedType: 'video',
      dateTimePicker: {
        mode:'range',
        dateFormat: 'Y/m/d',
      },
      dateTime: null,
      series: [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350
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
          datetime:'datetime',
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
          title: {
            text: '数量'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
            }
          }
        }
      },
    }
  },
}
</script>

<template>
  <Layout>

    <div class="row mt-2 mb-2">
      <!-- 类型选择 -->
      <select class="col-lg-1 mr-2 form-control custom-select" v-model="selectedType">
        <option>video</option>
        <option>audio</option>
      </select>
      <!-- ES搜索 -->
      <b-form-input
        class="col-lg-3 col-md-6 col-sm-12 mr-2"
        id="input-horizontal"
        value="Some text value..."
      ></b-form-input>
      <!-- 时间选择 -->
      <flat-pickr
        v-model="dateTime"
        :config="dateTimePicker"
        class="col-lg-3 col-md-6 col-sm-12 form-control"
        placeholder="Date and Time"
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
      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
        <MediaCard />
      </div>
    </div>

  </Layout>
</template>
