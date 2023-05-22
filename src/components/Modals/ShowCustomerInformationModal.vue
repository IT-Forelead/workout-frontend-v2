<script setup>
import notify from 'izitoast'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import XIcon from '../Icons/XIcon.vue'
import 'izitoast/dist/css/iziToast.min.css'
import UserIcon from '../Icons/UserIcon.vue'
import { computed, ref } from '@vue/reactivity'
import authHeader from '../../mixins/auth-header'
import AxiosService from '../../services/axios.service'
import { useModalStore } from '../../store/modal.store'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import { useCustomerStore } from '../../store/customer.store'
import SelectedCustomerInfo from '../Items/SelectedCustomerInfo.vue'
import { useCustomerTariffStore } from '../../store/customerTariff.store'

let page = 0
const total = ref(1)
const { t } = useI18n()
const distance = ref(0)
const target = ref('.customer-tariffs-wrapper')
const CUSTOMER_IMAGE_URL = import.meta.env.VITE_CUSTOMER_IMAGE_URL

const selectedCustomer = computed(() => {
  return useCustomerStore().selectedCustomer
})

const customerTariffs = computed(() => {
  return useCustomerTariffStore().customerTariffs
})

const closeModal = () => {
  useCustomerTariffStore().setSelectedCustomerTariff({})

  useModalStore().closeShowCustomerInformationModal()
}

const checkGender = (val) => {
  if (val == 'male') return t('male')
  return t('male')
}

const loadCustomerTariffs = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    AxiosService.post(
      '/tariff/report',
      cleanObjectEmptyFields({
        customerId: selectedCustomer.value?.id,
        page,
        limit: 30,
      }),
      { headers: authHeader() }
    )
      .then((result) => {
        total.value = result?.total
        useCustomerTariffStore().setCustomerTariffs(result?.data)
        $state.loaded()
      }).catch(() => {
        $state.error()
      })
  } else $state.loaded()
}

</script>
<template>
  <div v-if="useModalStore().isShowCustomerInformationModal"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 h-full max-w-[80vw] md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('customerTariffs') }}</div>
          <button @click="closeModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="p-5">
          <div class="space-y-5">
            <div class="flex justify-center">
              <div v-if="selectedCustomer?.image">
                <img :src="CUSTOMER_IMAGE_URL + selectedCustomer?.image" alt="#"
                  class="object-cover w-32 h-32 rounded-lg border duration-500 cursor-zoom-out hover:object-scale-down" />
              </div>
              <div v-else>
                <UserIcon class="w-32 h-32 rounded-lg text-gray-500 border p-1.5" />
              </div>
            </div>
            <div class="flex items-center capitalize"> {{ $t('userFullname') }}
              <p class="text-lg font-medium "> {{ ' : ' + selectedCustomer?.firstname + ' ' + selectedCustomer?.lastname
              }} </p>
            </div>
            <div class="flex items-center capitalize"> {{ $t('mobilePhone') }}
              <p class="text-lg font-medium "> {{ ' : ' + selectedCustomer?.phone }} </p>
            </div>
            <div class="flex items-center capitalize"> {{ $t('gender') }}
              <p class="text-lg font-medium "> {{ ' : ' + checkGender(selectedCustomer?.gender) }} </p>
            </div>
          </div>
        </div>
        <div class="overflow-auto xxl:overflow-x-hidden customer-tariffs-wrapper">
          <table class="min-w-max w-full table-auto mb-5">
            <thead class="sticky z-10 top-0 bg-white shadow">
              <tr class="text-gray-600 capitalize text-lg leading-normal">
                <th class="py-2 px-4 text-left">{{ $t('service') }}</th>
                <th class="py-2 px-4 text-left">{{ $t('duration') }}</th>
                <th class="py-2 px-4 text-left">{{ $t('price') }}</th>
                <th class="py-2 px-4 text-center">{{ $t('status') }}</th>
                <th class="py-2 px-4 text-center">{{ $t('paymentStatus') }}</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <SelectedCustomerInfo :customerTariffs="customerTariffs" :selectedCustomer="selectedCustomer"
                :distance="distance" :target="target" @infinite="loadCustomerTariffs" />
            </tbody>
          </table>
          <div v-if="selectedCustomer?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
