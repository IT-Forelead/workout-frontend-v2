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
import ServiceItem from '../components/Items/ServiceItem.vue'
import { cleanObjectEmptyFields } from '../mixins/utils'
import ServicesService from '../services/services.service'
import { useDropdownStore } from '../store/dropdown.store'
import { useModalStore } from '../store/modal.store'
import { useServiceStore } from '../store/service.store'

const isLoading = ref(false)

const services = computed(() => {
  return useServiceStore().services
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

const serviceName = ref('')

const submitFilterData = () => {
  isLoading.value = true
  ServicesService.getServices(
    cleanObjectEmptyFields({
      name: serviceName.value ? `%${serviceName.value}%` : '',
      serviceType: selectServiceType?.value?.id,
      durationDay: selectDurationDay?.value?.id,
      monthlyVisit: selectMonthlyVisit?.value?.id,
    })
  ).then((res) => {
    useServiceStore().clearStore()
    useServiceStore().setServices(res)
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
  ServicesService.getServices({}).then((res) => {
    useServiceStore().clearStore()
    useServiceStore().setServices(res)
  })
})
</script>

<template>
  <div class="px-4 py-2">
    <div class="bg-white rounded p-5">
      <div class="flex items-center justify-between mb-1">
        <p class="text-3xl font-bold">{{ $t('servicesReport') }}</p>
        <div class="flex items-center space-x-3">
          <div class="relative" ref="dropdown">
            <div @click="useModalStore().toggleFilterBy()"
              class="select-none bg-gray-100 rounded-lg w-full p-2 px-5 flex items-center space-x-2 hover:bg-gray-200 cursor-pointer">
              <FunnelIcon class="w-5 h-5 text-gray-500" />
              <span>{{ $t('filter') }}</span>
            </div>
            <div v-if="useModalStore().isOpenFilterBy"
              class="absolute bg-white shadow w-96 rounded-xl p-3 z-20 top-12 right-0 space-y-3">
              <div>
                <label for="name">{{ $t('serviceName') }}</label>
                <input v-model="serviceName" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" type="text"
                  id="name" :placeholder="$t('enterServiceName')" />
              </div>
              <div>
                <label>{{ $t('serviceType') }}</label>
                <SelectOptionServiceType />
              </div>
              <div>
                <label>{{ $t('duration') }}</label>
                <SelectOptionDurationDay />
              </div>
              <div>
                <label>{{ $t('monthlyVisit') }}</label>
                <SelectOptionMonthlyVisit />
              </div>
              <div v-if="isLoading"
                class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
                <Spinners270RingIcon
                  class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
                <span>{{ $t('loading') }}</span>
              </div>
              <div v-else @click="submitFilterData()"
                class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
                <span>{{ $t('filter') }}</span>
              </div>
            </div>
          </div>
          <div @click="useModalStore().openAddServiceModal()"
            class="bg-black text-white text-base rounded-lg p-2 px-4 cursor-pointer hover:bg-black/75">
            {{ $t('addService') }}
          </div>
        </div>
      </div>
      <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden users-wrapper">
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('serviceName') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('serviceType') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('duration') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('priceForMale') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('priceForFemale') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <ServiceItem :services="services" />
          </tbody>
        </table>
        <div v-if="services?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
