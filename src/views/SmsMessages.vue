<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import { vMaska } from "maska"
import { onMounted } from 'vue'
import FunnelIcon from '../components/Icons/FunnelIcon.vue'
import Spinners270RingIcon from '../components/Icons/Spinners270RingIcon.vue'
import SelectOptionDeliveryStatus from '../components/Inputs/SelectOptionDeliveryStatus.vue'
import SelectOptionMessageType from '../components/Inputs/SelectOptionMessageType.vue'
import SmsMessageItem from '../components/Items/SmsMessageItem.vue'
import { cleanObjectEmptyFields } from '../mixins/utils'
import SmsMessageService from '../services/smsMessage.service'
import { useDropdownStore } from '../store/dropdown.store'
import { useModalStore } from '../store/modal.store'
import { useSmsMessageStore } from '../store/smsMessage.store'

const isLoading = ref(false)

const total = ref(1)
const smsMessages = computed(() => {
  return useSmsMessageStore().smsMessages
})
const target = ref('.sms-messages-wrapper')
const distance = ref(0)

const selectedMessageType = computed(() => {
  return useDropdownStore().selectMessageTypeOption
})

const selectedDeliveryStatus = computed(() => {
  return useDropdownStore().selectDeliveryStatusOption
})

let page = 0
const loadSmsMessages = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    SmsMessageService.getSmsMessages(
      cleanObjectEmptyFields({
        phone: filterData.phone.replace(/([() -])/g, ''),
        messageType: selectedMessageType.value?.id,
        deliveryStatus: selectedDeliveryStatus.value?.id,
        startDate: filterData.startDate,
        endDate: filterData.endDate,
        page: page,
        limit: 30,
      })
    ).then((result) => {
      total.value = result?.total
      useSmsMessageStore().setSmsMessages(result?.data)
      $state.loaded()
    }).catch(() => {
      $state.error()
    })
  } else $state.loaded()
}

onMounted(() => {
  useSmsMessageStore().clearStore()
})

const dropdown = ref(null)

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

const filterData = reactive({
  phone: '',
  messageType: '',
  deliveryStatus: '',
  startDate: '',
  endDate: '',
})

const submitFilterData = () => {
  isLoading.value = true
  SmsMessageService.getSmsMessages(
    cleanObjectEmptyFields({
      phone: filterData.phone.replace(/([() -])/g, ''),
      messageType: selectedMessageType.value?.id,
      deliveryStatus: selectedDeliveryStatus.value?.id,
      startDate: filterData.startDate,
      endDate: filterData.endDate,
      page: 1,
      limit: 30,
    })
  ).then((res) => {
    useSmsMessageStore().clearStore()
    useSmsMessageStore().setSmsMessages(res?.data)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}
</script>

<template>
  <div class="px-4 py-2">
    <div class="bg-white rounded p-5">
      <div class="flex items-center justify-between mb-1">
        <p class="text-3xl font-bold">{{ $t('smsMessagesReport') }}</p>
        <div class="flex items-center space-x-3">
          <div class="relative" ref="dropdown">
            <div @click="useModalStore().toggleFilterBy()"
              class="select-none bg-gray-100 rounded-lg w-full p-2 px-5 flex items-center space-x-2 hover:bg-gray-200 cursor-pointer">
              <FunnelIcon class="w-5 h-5 text-gray-500" />
              <span>
                {{ $t('filter') }}
              </span>
            </div>
            <div v-if="useModalStore().isOpenFilterBy"
              class="absolute bg-white shadow rounded-xl p-3 z-20 top-12 right-0 space-y-3">
              <div>
                <label for="phone">{{ $t('phone') }}</label>
                <input v-model="filterData.phone" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full"
                  type="text" v-maska data-maska="+998(##) ###-##-##" placeholder="+998(00) 000-00-00" />
              </div>
              <div>
                <label>{{ $t('messageType') }}</label>
                <SelectOptionMessageType />
              </div>
              <div>
                <label>{{ $t('deliveryStatus') }}</label>
                <SelectOptionDeliveryStatus />
              </div>
              <div>
                <label>{{ $t('createdAt') }}</label>
                <div class="flex items-center space-x-1">
                  <div class="relative">
                    <input v-model="filterData.startDate" type="datetime-local"
                      class="w-60 rounded-lg border-none bg-gray-100 text-gray-500 pr-11" />
                    <div class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-2 text-sm">{{ $t('from') }}</div>
                  </div>
                  <div class="relative">
                    <input v-model="filterData.endDate" type="datetime-local"
                      class="w-60 rounded-lg border-none bg-gray-100 text-gray-500 pr-11" />
                    <div class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-2 text-sm">{{ $t('to') }}</div>
                  </div>
                </div>
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
        </div>
      </div>
      <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden sms-messages-wrapper">
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('phone') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('text') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('sentDate') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('messageType') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('deliveryStatus') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <SmsMessageItem :smsMessages="smsMessages" :distance="distance" :target="target"
              @infinite="loadSmsMessages" />
          </tbody>
        </table>
        <div v-if="smsMessages?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
