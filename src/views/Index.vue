<script setup>
import moment from 'moment'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ChartBarIcon from '../assets/icons/ChartBarIcon.vue'
import FootPrintsIcon from '../assets/icons/FootPrintsIcon.vue'
import UsersThreeIcon from '../assets/icons/UsersThreeIcon.vue'
import UsersIcon from '../assets/icons/UsersIcon.vue'
import PublicNavbar from '../components/PublicNavbar.vue'
import VisitService from '../services/visit.service'
import { useVisitStore } from '../store/visit.store'

const { t } = useI18n()
const numberOfAllCustomers = ref(215)

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
      categories: fewWeeksVisits.value?.map((a) => a.x),
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
})
</script>
<template>
  <PublicNavbar />
  <div class="w-full h-screen bg-gray-100 py-20 px-10 space-y-6">
    <div class="grid grid-cols-3 gap-8 w-full">
      <div class="bg-white col-span-2 rounded-lg">
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
      <div class="space-y-4">
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
              <p>{{ $t('inGym') }}</p>
              <p class="text-2xl font-bold">0</p>
            </div>
            <div class="rounded-xl p-3 bg-lime-300 flex items-center justify-center">
              <FootPrintsIcon class="w-7 h-7 text-gray-900" />
            </div>
          </div>
          <p>{{ $t('currentlyNumberOfCustomersInGym') }}</p>
        </div>
        <div class="bg-white rounded-lg w-full p-5 space-y-2">
          <div class="flex justify-between mb-3">
            <div>
              <p>{{ $t('trainers') }}</p>
              <p class="text-2xl font-bold">2</p>
            </div>
            <div class="rounded-xl p-3 bg-lime-300 flex items-center justify-center">
              <UsersIcon class="w-7 h-7 text-gray-900" />
            </div>
          </div>
          <p>{{ $t('numberOfTrainers') }}</p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-8 w-full">
      <div class="bg-lime-300 rounded-lg">
        <div class="flex items-center justify-between p-5">
          <div>
            <div class="text-lg font-bold">{{ $t('visitStatistics') }}</div>
            <div class="text-sm">{{ $t('fewWeeklyStatistics') }}</div>
          </div>
          <div class="rounded-xl p-3 bg-white flex items-center justify-center">
            <ChartBarIcon class="w-7 h-7 text-gray-900" />
          </div>
        </div>
        <div class="px-1">
          <apexchart type="bar" height="180" :options="numberOfFewWeeksVisitsChartOptions"
            :series="numberOfFewWeeksVisitsSeries"></apexchart>
        </div>
      </div>
      <div class="bg-white rounded-lg w-full">
        <div class="flex items-center justify-between p-5">
          <div>
            <div class="text-lg font-bold">{{ $t('visitStatistics') }}</div>
            <div class="text-sm">{{ $t('statisticsForSeveralMonths') }}</div>
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
  </div>
</template>
<style scoped></style>
