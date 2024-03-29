<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import moment from 'moment'
import { onMounted, onUnmounted } from 'vue'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import VisitService from '../../services/visit.service'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import { useVisitStore } from '../../store/visit.store'
import FunnelIcon from '../../assets/icons/FunnelIcon.vue'
import Spinners270RingIcon from '../../assets/icons/Spinners270RingIcon.vue'
import SelectOptionCustomer from '../Inputs/SelectOptionCustomer.vue'
import SelectOptionVisitType from '../Inputs/SelectOptionVisitType.vue'
import VisitItem from '../Items/VisitItem.vue'

const isLoading = ref(false)

const filterData = reactive({
  customerId: '',
  visitType: '',
})

const total = ref(1)
const visits = computed(() => {
  return useVisitStore().visits
})
const target = ref('.customer-tariffs-wrapper')
const distance = ref(0)

const selectedCustomer = computed(() => {
  return useDropdownStore().selectCustomerOption
})

const selectedVisitType = computed(() => {
  return useDropdownStore().selectVisitTypeOption
})

let page = 0
const loadVisits = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    VisitService.getVisits(
      cleanObjectEmptyFields({
        customerId: selectedCustomer.value?.id,
        visitType: selectedVisitType.value?.id,
        startDate: moment().startOf('day').format().slice(0, 16),
        endDate: moment().endOf('day').format().slice(0, 16),
        page: page,
        limit: 30,
      })
    ).then((result) => {
      total.value = result?.total
      useVisitStore().setVisits(result?.data)
      $state.loaded()
    }).catch(() => {
      $state.error()
    })
  } else $state.loaded()
}

/* REFRESH FUNCTION */
const isRefresh = ref(false)

const autoRefresher =
  setInterval(() => {
    isRefresh.value = true
    VisitService.getVisits(
      cleanObjectEmptyFields({
        customerId: selectedCustomer.value?.id,
        visitType: selectedVisitType.value?.id,
        startDate: moment().startOf('day').format().slice(0, 16),
        endDate: moment().endOf('day').format().slice(0, 16),
        page: 1,
        limit: 30,
      })
    ).then((result) => {
      total.value = result?.total
      useVisitStore().setAutoRefreshVisits(result?.data)
      isRefresh.value = false
    }).catch((err) => {
      console.log("Error:", err);
    })
  }, 3000);

onMounted(() => {
  useVisitStore().clearStore()
  autoRefresher
})

onUnmounted(() => {
  clearInterval(autoRefresher)
})

const dropdown = ref(null)

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

const submitFilterData = () => {
  isLoading.value = true
  VisitService.getVisits(
    cleanObjectEmptyFields({
      customerId: selectedCustomer.value?.id,
      visitType: selectedVisitType.value?.id,
      startDate: filterData.startDate,
      endDate: filterData.endDate,
      page: 1,
      limit: 30,
    })
  ).then((res) => {
    useVisitStore().clearStore()
    useVisitStore().setVisits(res?.data)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}
</script>

<template>
  <div class="px-4 py-2 min-h-screen dark:bg-gray-800">
    <div class="bg-white rounded p-5 dark:bg-gray-900">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="bg-yellow-300 rounded-lg p-1.5 px-3">
            {{ $t('dailyVisits') }}
          </div>
          <div>|</div>
          <router-link to="/visits/report"
            class="bg-gray-200 hover:bg-gray-300 cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg p-1.5 px-3 dark:bg-gray-800 dark:text-gray-300">
            {{ $t('visitsReport') }}
          </router-link>
          <Spinners270RingIcon v-show="isRefresh" class="ml-3 w-7 h-7 text-gray-300" />
        </div>
        <div class="flex items-center space-x-3">
          <div class="relative" ref="dropdown">
            <div @click="useModalStore().toggleFilterBy()"
              class="select-none bg-gray-100 rounded-lg w-full p-2 px-5 flex items-center space-x-2 hover:bg-gray-200 cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700">
              <FunnelIcon class="w-5 h-5 text-gray-500 dark:text-gray-300" />
              <span class="dark:text-gray-300">
                {{ $t('filter') }}
              </span>
            </div>
            <div v-if="useModalStore().isOpenFilterBy"
              class="absolute bg-white shadow rounded-xl w-96 p-3 z-20 top-12 right-0 space-y-3 dark:bg-gray-800 border dark:border-gray-600">
              <div>
                <label class="dark:text-gray-300">{{ $t('customer') }}</label>
                <SelectOptionCustomer />
              </div>
              <div>
                <label class="dark:text-gray-300">{{ $t('visitType') }}</label>
                <SelectOptionVisitType />
              </div>
              <div v-if="isLoading"
                class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
                <Spinners270RingIcon
                  class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
                <span>{{ $t('loading') }}</span>
              </div>
              <div v-else @click="submitFilterData()"
                class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center dark:bg-blue-500 dark:hover:bg-blue-600">
                <span>{{ $t('filter') }}</span>
              </div>
            </div>
          </div>
          <div @click="useModalStore().openAddVisitModal()"
            class="bg-black text-white text-base rounded-lg p-2 px-4 cursor-pointer hover:bg-black/75 dark:bg-blue-500 dark:hover:bg-blue-600">
            {{ $t('addVisit') }}
          </div>
        </div>
      </div>
      <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden customer-tariffs-wrapper">
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow dark:bg-gray-900 dark:shadow-gray-600">
            <tr class="text-gray-600 capitalize text-lg leading-normal dark:text-white">
              <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('customer') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('monthlyVisit') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('information') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('visitTime') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('visitType') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <VisitItem :visits="visits" :distance="distance" :target="target" @infinite="loadVisits" />
          </tbody>
        </table>
        <div v-if="visits?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
