<script setup>
import moment from 'moment'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ChartBarIcon from '../assets/icons/ChartBarIcon.vue'
import FootPrintsIcon from '../assets/icons/FootPrintsIcon.vue'
import UsersThreeIcon from '../assets/icons/UsersThreeIcon.vue'
import CustomerService from '../services/customer.service'
import VisitService from '../services/visit.service'
import { useVisitStore } from '../store/visit.store'

const { t } = useI18n()
const numberOfAllCustomers = ref(0)
const numberOfCustomersInGym = ref(0)

const dailyVisits = computed(() => {
  return useVisitStore().dailyVisits
})

const fewWeeksVisits = computed(() => {
  return useVisitStore().fewWeeksVisits
})

const fewMonthsVisits = computed(() => {
  return useVisitStore().fewMonthsVisits
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
            color: '#6b7280'
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
          colors: ['#8e8da4', '#8e8da4', '#8e8da4',  '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4',],
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
    name: 'series 1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'series 2',
    data: [11, 32, 45, 32, 34, 52, 41]
  }
])

const expensesChartChartOptions = {
  legend:{
    labels:{
      colors:['#8e8da4']
    },
  },
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
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        fontSize: '12px',
        colors: ['#8e8da4', '#8e8da4', '#8e8da4',  '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4',],
      },
    },
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

// Few Weeks Visits Chart
const numberOfFewWeeksVisitsSeries = computed(() => [
  {
    name: t('numberOfVisitsPerWeek'),
    data: fewWeeksVisits.value?.map((a) => a.y),
  },
])

const numberOfFewWeeksVisitsChartOptions = computed(() => {
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
            color: '#6b7280'
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
      categories: fewWeeksVisits.value?.map((a) => a.x),
      labels: {
        style: {
          fontSize: '12px',
          colors:['#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4']
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

// Few Weeks Visits Chart
const numberOfMonthlyOperationsSeries = computed(() => [
  {
    name: t('numberOfMonthlyVisits'),
    data: fewMonthsVisits.value?.map((a) => a.visits),
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
      categories: fewMonthsVisits.value?.map((a) => a.month),
      labels: {
        style: {
          fontSize: '12px',
          colors:['#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4', '#8e8da4']
        },
        formatter: function (val) {
          return moment(val).format('MMMM')
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

onMounted(() => {
  VisitService.getNumberOfDailyVisit()
    .then((res) => {
      useVisitStore().clearStore()
      useVisitStore().setDailyVisits(res?.data)
      VisitService.getNumberOfFewWeeksVisits()
        .then((res) => {
          useVisitStore().setFewWeeksVisits(res?.data)
        })
      VisitService.getNumberOfFewMonthsVisits()
        .then((res) => {
          useVisitStore().setFewMonthsVisits(res?.data)
        })
    })
  CustomerService.getCustomers({})
    .then((result) => {
      numberOfAllCustomers.value = result?.total
    })
  CustomerService.getCustomersInGym()
    .then((result) => {
      numberOfCustomersInGym.value = result.length
    })
})
</script>
<template>
  <div class="min-h-screen px-6 py-6 dark:border-l dark:border-l-gray-600 dark:bg-gray-800">
    <div class="grid grid-cols-2 gap-x-5 mb-6 overflow-hidden">
      <div class="bg-white rounded-lg dark:bg-gray-900">
        <div class="flex items-center justify-between p-5">
          <div>
            <h1 class="text-3xl font-bold dark:text-white">{{ $t('visitStatistics') }}</h1>
            <p class="font-medium text-lg dark:text-gray-300">{{ $t('sevenBusinessDayStatistics') }}</p>
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
                <div class="text-lg font-bold">{{ $t('visitStatistics') }}</div>
                <div class="text-sm">{{ $t('fewWeeklyStatistics') }}</div>
              </div>
              <div class="rounded-xl p-3 bg-white dark:bg-gray-900 flex items-center justify-center">
                <ChartBarIcon class="w-7 h-7 text-gray-900 dark:text-white" />
              </div>
            </div>
            <div class="px-1">
              <apexchart type="bar" height="180" :options="numberOfFewWeeksVisitsChartOptions"
                :series="numberOfFewWeeksVisitsSeries"></apexchart>
            </div>
          </div>
          <div class="bg-white rounded-lg w-full dark:bg-gray-900">
            <div class="flex items-center justify-between p-5">
              <div>
                <div class="text-lg font-bold dark:text-white">{{ $t('visitStatistics') }}</div>
                <div class="text-sm dark:text-gray-300">{{ $t('statisticsForSeveralMonths') }}</div>
              </div>
              <div class="rounded-xl p-3 bg-lime-300 flex items-center justify-center">
                <ChartBarIcon class="w-7 h-7 text-gray-900" />
              </div>
            </div>
            <div class="px-1">
              <apexchart type="bar" height="180" :options="numberOfMonthlyOperationsChartOptions"
                :series="numberOfMonthlyOperationsSeries"></apexchart>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <div class="bg-white rounded-lg w-full p-5 space-y-2 dark:bg-gray-900">
            <div class="flex justify-between mb-3">
              <div class="dark:text-gray-300">
                <p>{{ $t('customers') }}</p>
                <p class="text-2xl font-bold">{{ numberOfAllCustomers }}</p>
              </div>
              <div class="rounded-xl p-3 bg-lime-300 flex items-center justify-center">
                <UsersThreeIcon class="w-8 h-8 text-gray-900" />
              </div>
            </div>
            <p class="dark:text-gray-300">{{ $t('numberOfRegisteredCustomers') }}</p>
          </div>
          <div class="bg-white rounded-lg w-full p-5 space-y-2 dark:bg-gray-900">
            <div class="flex justify-between mb-3">
              <div>
                <p class="dark:text-white">{{ $t('inGym') }}</p>
                <p class="text-2xl font-bold dark:text-gray-300">{{ numberOfCustomersInGym }}</p>
              </div>
              <div class="rounded-xl p-3 bg-lime-300 flex items-center justify-center">
                <FootPrintsIcon class="w-7 h-7 text-gray-900" />
              </div>
            </div>
            <p class="dark:text-gray-300">{{ $t('currentlyNumberOfCustomersInGym') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg w-full p-3 dark:bg-gray-900">
      <p class="dark:text-white font-bold px-2 text-lg">Cost statistics</p>
      <apexchart type="area" height="320" :options="expensesChartChartOptions" :series="expensesChartSeries"></apexchart>
    </div>
  </div>
</template>
<style scoped></style>
