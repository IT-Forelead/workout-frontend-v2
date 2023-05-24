<script setup>
import moment from 'moment'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVisitStore } from '../store/visit.store'
import ChartBarHorizontalIcon from '../components/Icons/ChartBarHorizontalIcon.vue'
import ChartBarIcon from '../components/Icons/ChartBarIcon.vue'
import VisitService from '../services/visit.service'
import CustomerService from '../services/customer.service'
import FootPrintsIcon from '../components/Icons/FootPrintsIcon.vue'
import UsersThreeIcon from '../components/Icons/UsersThreeIcon.vue'

const { t } = useI18n()
const numberOfAllCustomers = ref(0)

const dailyVisits = computed(() => {
  return useVisitStore().dailyVisits
})

// Daily visits chart
const numberOfDailyVisitsSeries = computed(() => [
  {
    name: t('numberOfVisits'),
    data: dailyVisits.value?.map((a) => a.y),
  },
])

const numberOfDailyVisitsChartOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '60%',
        distributed: true,
        dataLabels: {
          position: 'top',
        },
        colors: {
          ranges: [{
            from: 0,
            to: 10,
            color: '#161b22'
          }, {
            from: 11,
            to: 20,
            color: '#0e4429'
          }, {
            from: 21,
            to: 30,
            color: '#006d32'
          }, {
            from: 31,
            to: 40,
            color: '#26a641'
          }, {
            from: 41,
            to: 2000,
            color: '#39d353'
          }]
        }
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: '14px',
        colors: ['#304758'],
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: dailyVisits.value?.map((a) => a.x),
      labels: {
        style: {
          fontSize: '12px',
        },
        formatter: function (val) {
          return moment(val).format('D-MMMM')
        },
      },
      tooltip: {
        enabled: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
  }
})

// Expenses Chart
const expensesChartSeries = computed(() => [
  {
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41]
  }
])

const expensesChartChartOptions = {
  chart: {
    height: 350,
    type: 'area',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Cost statistics',
    align: 'left',
    style: {
      fontSize: '18px',
    },
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
  },
  yaxis: {
    tickAmount: 6,
    floating: false,
    labels: {
      show: true,
      // formatter: function (val) {
      //   return useMoneyFormatter(val)
      // },
      style: {
        colors: '#8e8da4',
      },
      offsetY: 0,
      offsetX: 0,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: true,
    },
  },
  fill: {
    opacity: 0.5,
  },
  tooltip: {
    fixed: {
      enabled: false,
      position: 'topRight',
    },
  },
  grid: {
    yaxis: {
      lines: {
        offsetX: -30,
      },
    },
    padding: {
      left: 20,
    },
  },

}

// Daily Operations Chart
const numberOfDailyOperationsSeries = computed(() => [
  {
    name: 'Operatsiyalar soni',
    data: [31, 40, 28, 51, 42, 109, 100]
  },
])

const numberOfDailyOperationsChartOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '45%',
        distributed: true,
        dataLabels: {
          position: 'top',
        },
        colors: {
          ranges: [{
            from: 0,
            to: 2,
            color: '#161b22'
          }, {
            from: 3,
            to: 4,
            color: '#0e4429'
          }, {
            from: 5,
            to: 6,
            color: '#006d32'
          }, {
            from: 7,
            to: 8,
            color: '#26a641'
          }, {
            from: 9,
            to: 200,
            color: '#39d353'
          }]
        }
      },
    },
    dataLabels: {
      enabled: true,
      // formatter: function (val) {
      //   return val
      // },
      offsetY: -17,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
      labels: {
        style: {
          fontSize: '12px',
        },
        formatter: function (val) {
          return moment(val).format('D-MMM')
        },
      },
      tooltip: {
        enabled: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val
        },
      },
    },
    grid: {
      show: false,
    },
  }
})

// Monthly Operations Chart
const numberOfMonthlyOperationsSeries = computed(() => [
  {
    name: 'series1',
    data: [31, 51, 72, 109, 100]
  }
])

const numberOfMonthlyOperationsChartOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    colors: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff'],
      },
      formatter: function (val) {
        return val
      },
      offsetX: 0,
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    xaxis: {
      categories: ['Apples', 'Oranges', 'Mangoes', 'Bananas', 'Blackberries'],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    tooltip: {
      x: {
        show: true,
      },
      y: {
        title: {
          formatter: function () {
            return 'Number:'
          },
        },
      },
    },
    grid: {
      show: false,
    },
  }
})

onMounted(() => {
  VisitService.getNumberOfDailyVisit()
  .then((res) => {
    useVisitStore().clearStore()
    useVisitStore().setDailyVisits(res)
  })
  CustomerService.getCustomers({})
    .then((result) => {
      numberOfAllCustomers.value = result?.total
    })
})
</script>

<template>
  <div class="px-4 py-2">
    <div class="grid grid-cols-2 gap-x-5 mb-6 overflow-hidden">
      <div class="bg-white rounded-lg">
        <div class="flex items-center justify-between p-5">
          <div>
            <h1 class="text-3xl font-bold">{{ $t('visitStatistics') }}</h1>
            <p class="font-medium text-lg">{{ $t('sevenBusinessDayStatistics') }}</p>
          </div>
          <div class="rounded-xl p-3 bg-lime-300 flex items-center justify-center">
            <ChartBarIcon class="w-9 h-9 text-gray-900" />
          </div>
        </div>
        <apexchart type="bar" height="300" :options="numberOfDailyVisitsChartOptions" :series="numberOfDailyVisitsSeries">
        </apexchart>
      </div>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-x-5">
          <div class="bg-lime-300 rounded-lg">
            <div class="flex items-center justify-between p-5">
              <div>
                <div class="text-lg font-bold">Visit statistics</div>
                <div class="text-sm">Statistics for a week</div>
              </div>
              <div class="rounded-xl p-3 bg-white flex items-center justify-center">
                <ChartBarIcon class="w-7 h-7 text-gray-900" />
              </div>
            </div>
            <div class="px-1">
              <apexchart type="bar" height="180" :options="numberOfDailyOperationsChartOptions"
                :series="numberOfDailyOperationsSeries"></apexchart>
            </div>
          </div>
          <div class="bg-white rounded-lg w-full">
            <div class="flex items-center justify-between p-5">
              <div>
                <div class="text-lg font-bold">Visit statistics</div>
                <div class="text-sm">Statistics for a month</div>
              </div>
              <div class="rounded-xl p-3 bg-lime-300 flex items-center justify-center">
                <ChartBarHorizontalIcon class="w-7 h-7 text-gray-900" />
              </div>
            </div>
            <div class="px-1">
              <apexchart type="bar" height="180" :options="numberOfMonthlyOperationsChartOptions"
                :series="numberOfMonthlyOperationsSeries"></apexchart>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <div class="bg-white rounded-lg w-full p-5 space-y-2">
            <div class="flex justify-between mb-3">
              <div>
                <p>{{ $t('customers') }}</p>
                <p class="text-2xl font-bold">{{ numberOfAllCustomers }}</p>
              </div>
              <div class="rounded-xl p-3 bg-lime-300 flex items-center justify-center">
                <UsersThreeIcon class="w-8 h-8 text-gray-900" />
              </div>
            </div>
            <p>{{ $t('numberOfRegisteredCustomers') }}</p>
          </div>
          <div class="bg-white rounded-lg w-full p-5 space-y-2">
            <div class="flex justify-between mb-3">
              <div>
                <p>In GYM</p>
                <p class="text-2xl font-bold">17</p>
              </div>
              <div class="rounded-xl p-3 bg-lime-300 flex items-center justify-center">
                <FootPrintsIcon class="w-7 h-7 text-gray-900" />
              </div>
            </div>
            <p>Currently our clients in GYM</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg w-full p-3">
      <apexchart type="area" height="320" :options="expensesChartChartOptions" :series="expensesChartSeries"></apexchart>
    </div>

    <!-- <div class="grid grid-cols-2 gap-5">
      <div class="bg-white rounded-xl h-[40vh] p-5"></div>
      <div class="grid grid-cols-2 gap-5">
        <div class="bg-white rounded-xl capitalize h-full p-5"></div>
        <div class="bg-white rounded-xl capitalize h-full p-5"></div>
        <div class="bg-white rounded-xl capitalize h-full p-5"></div>
        <div class="bg-white rounded-xl capitalize h-full p-5"></div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-5 mt-5">
      <div class="bg-white rounded-xl h-[43vh] p-5 col-span-3"></div>
      <div class="grid grid-cols-1 gap-5 grid-rows-4">
        <div class="bg-white rounded-xl capitalize h-full p-5 row-span-3"></div>
        <div class="bg-white rounded-xl capitalize h-full p-5"></div>
      </div>
    </div> -->
  </div>
</template>

<style scoped></style>
