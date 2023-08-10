<script setup>
import { computed, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import 'izitoast/dist/css/iziToast.min.css'
import { onMounted } from 'vue'
import FunnelIcon from '../assets/icons/FunnelIcon.vue'
import Spinners270RingIcon from '../assets/icons/Spinners270RingIcon.vue'
import SelectOptionDurationDay from '../components/Inputs/SelectOptionDurationDay.vue'
import SelectOptionMonthlyVisit from '../components/Inputs/SelectOptionMonthlyVisit.vue'
import SelectOptionServiceType from '../components/Inputs/SelectOptionServiceType.vue'
import SelectOptionTrainer from '../components/Inputs/SelectOptionTrainer.vue'
import TrainerServiceItem from '../components/Items/TrainerServiceItem.vue'
import { cleanObjectEmptyFields } from '../mixins/utils'
import TrainerServicesService from '../services/trainerService.service'
import { useDropdownStore } from '../store/dropdown.store'
import { useModalStore } from '../store/modal.store'
import { useTrainerServiceStore } from '../store/trainerService.store'

const isLoading = ref(false)
const serviceName = ref('')

const trainerServices = computed(() => {
  return useTrainerServiceStore().trainerServices
})

const selectTrainer = computed(() => {
  return useDropdownStore().selectTrainerOption
})

const selectServiceType = computed(() => {
  return useDropdownStore().selectServiceTypeOption
})

const selectDurationDay = computed(() => {
  return useDropdownStore().selectDurationDayOption
})

const selectMonthlyVisit = computed(() => {
  return useDropdownStore().selectMonthlyVisitOption
})

const submitFilterData = () => {
  isLoading.value = true
  TrainerServicesService.getTrainerServices(
    cleanObjectEmptyFields({
      userId: selectTrainer?.value?.id,
      name: serviceName.value ? `%${serviceName.value}%` : '',
      serviceType: selectServiceType?.value?.id,
      durationDay: selectDurationDay?.value?.id,
      monthlyVisit: selectMonthlyVisit?.value?.id,
    })
  ).then((res) => {
    useTrainerServiceStore().clearStore()
    useTrainerServiceStore().setTrainerServices(res)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}

const dropdown = ref(null)

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

onMounted(() => {
  TrainerServicesService.getTrainerServices({}).then((res) => {
    useTrainerServiceStore().clearStore()
    useTrainerServiceStore().setTrainerServices(res)
  })
})
</script>

<template>
  <div class="px-4 py-4 dark:bg-gray-800 min-h-screen">
    <div class="bg-white rounded p-5 dark:bg-gray-900">
      <div class="flex items-center justify-between mb-4">
        <p class="text-3xl font-bold dark:text-white">{{ $t('trainerServicesReport') }}</p>
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
              class="absolute bg-white shadow w-96 rounded-xl p-3 z-20 top-12 right-0 space-y-3 dark:bg-gray-800 border dark:border-gray-600">
              <div>
                <label class="dark:text-white" for="serviceType">{{ $t('trainer') }}</label>
                <SelectOptionTrainer />
              </div>
              <div>
                <label class="dark:text-white" for="name">{{ $t('serviceName') }}</label>
                <input v-model="serviceName" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-400" type="text"
                  id="name" :placeholder="$t('enterServiceName')" />
              </div>
              <div>
                <label class="dark:text-white">{{ $t('serviceType') }}</label>
                <SelectOptionServiceType />
              </div>
              <div>
                <label class="dark:text-white">{{ $t('duration') }}</label>
                <SelectOptionDurationDay />
              </div>
              <div>
                <label class="dark:text-white">{{ $t('monthlyVisit') }}</label>
                <SelectOptionMonthlyVisit />
              </div>
              <div v-if="isLoading"
                class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
                <Spinners270RingIcon
                  class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
                <span>{{ $t('loading') }}</span>
              </div>
              <div v-else @click="submitFilterData()"
                class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center dark:hover:bg-gray-700">
                <span>{{ $t('filter') }}</span>
              </div>
            </div>
          </div>
          <div @click="useModalStore().openAddTrainerServiceModal()"
            class="bg-black text-white text-base rounded-lg p-2 px-4 cursor-pointer hover:bg-black/75 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            {{ $t('addService') }}
          </div>
        </div>
      </div>
      <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden users-wrapper">
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white dark:bg-gray-800 shadow">
            <tr class="text-gray-600  dark:text-white capitalize text-lg leading-normal">
              <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('trainer') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('serviceName') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('serviceType') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('duration') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('price') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <TrainerServiceItem :trainerServices="trainerServices" />
          </tbody>
        </table>
        <div v-if="trainerServices?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
