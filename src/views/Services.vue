<script setup>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import 'izitoast/dist/css/iziToast.min.css'
import ServicesService from '../services/services.service'
import { useServiceStore } from '../store/service.store'
import { useModalStore } from '../store/modal.store'
import ServiceItem from '../components/Items/ServiceItem.vue'

const services = computed(() => {
  return useServiceStore().services
})

onMounted(() => {
  ServicesService.getAllServices().then((res) => {
    useServiceStore().clearStore()
    useServiceStore().setServices(res)
  })
})
</script>

<template>
  <div class="px-4 py-2">
    <div class="bg-white rounded p-5">
      <div class="flex items-center justify-between mb-1">
        <p class="text-3xl font-bold">Service report</p>
        <div class="flex items-center">
          <div @click="useModalStore().openAddServiceModal()"
            class="bg-black text-white text-base rounded-lg p-2 px-4 cursor-pointer hover:bg-black/75">
            add Service
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
