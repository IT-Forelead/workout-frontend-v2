<script setup>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import 'izitoast/dist/css/iziToast.min.css'
import TrainerServicesService from '../services/trainerService.service'
import { useTrainerServiceStore } from '../store/trainerService.store'
import { useModalStore } from '../store/modal.store'
import TrainerServiceItem from '../components/Items/TrainerServiceItem.vue'

const trainerServices = computed(() => {
  return useTrainerServiceStore().trainerServices
})

onMounted(() => {
  TrainerServicesService.getAllTrainerServices().then((res) => {
    useTrainerServiceStore().clearStore()
    useTrainerServiceStore().setTrainerServices(res)
  })
})
</script>

<template>
  <div class="px-4 py-2">
    <div class="bg-white rounded capitalize h-[40vh] p-5">
      <div class="flex items-center justify-between mb-1">
        <p class="text-3xl font-bold">Trainer Service report</p>
        <div class="flex items-center">
          <div @click="useModalStore().openAddTrainerServiceModal()"
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
