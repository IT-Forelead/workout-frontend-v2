<script setup>
import CustomerTariffItem from '../components/Items/CustomerTariffItem.vue'
import authHeader from '../mixins/auth-header'
import { computed, ref, reactive } from '@vue/reactivity'
import { useCustomerTariffStore } from '../store/customerTariff.store'
import { useModalStore } from '../store/modal.store'
import { useDropdownStore } from '../store/dropdown.store'
import { onMounted } from 'vue'
import CustomerTariffService from '../services/customerTariff.service'
import AxiosService from '../services/axios.service';
import { onClickOutside } from '@vueuse/core'
import { cleanObjectEmptyFields } from '../mixins/utils'
import FunnelIcon from '../components/Icons/FunnelIcon.vue'
import Spinners270RingIcon from '../components/Icons/Spinners270RingIcon.vue'
import SelectOptionPaymentStatus from '../components/Inputs/SelectOptionPaymentStatus.vue'

const isLoading = ref(false)

const total = ref(1)
const customerTariffs = computed(() => {
  return useCustomerTariffStore().customerTariffs
})
const target = ref('.customer-tariffs-wrapper')
const distance = ref(0)

const selectPaymentStatus = computed(() => {
  return useDropdownStore().selectPaymentStatusOption
})

let page = 0
const loadCustomerTariffs = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    AxiosService.post(
      '/tariff/report',
      cleanObjectEmptyFields({
        paymentStatus: selectPaymentStatus.value?.id,
        startDate: filterData.startDate,
        endDate: filterData.endDate,
        expireAtFrom: filterData.expireAtFrom,
        expireAtTo: filterData.expireAtTo,
        page: page,
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

onMounted(() => {
  useCustomerTariffStore().clearStore()
})

const dropdown = ref(null)

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

const filterData = reactive({
  customerId: '',
  serviceId: '',
  paymentStatus: '',
  startDate: '',
  endDate: '',
  expireAtFrom: '',
  expireAtTo: '',
})

const submitFilterData = () => {
  isLoading.value = true
  CustomerTariffService.getCustomerTariffs(
    cleanObjectEmptyFields({
      paymentStatus: selectPaymentStatus.value?.id,
      startDate: filterData.startDate,
      endDate: filterData.endDate,
      expireAtFrom: filterData.expireAtFrom,
      expireAtTo: filterData.expireAtTo,
      page: 1,
      limit: 30,
    })
  ).then((res) => {
    useCustomerTariffStore().clearStore()
    useCustomerTariffStore().setCustomerTariffs(res?.data)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}
</script>

<template>
  <div class="px-4 py-2">
    <div class="bg-white rounded capitalize h-[40vh] p-5">
      <div class="flex items-center justify-between mb-1">
        <p class="text-3xl font-bold">Customer Tariff report</p>
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
                <label for="customerId">{{ $t('customer') }}</label>
                <select id="customerId" v-model="filterData.customerId"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full">
                  <option value="" selected>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label for="serviceId">{{ $t('service') }}</label>
                <select id="serviceId" v-model="filterData.serviceId"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full">
                  <option value="" selected>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label for="paymentStatus">{{ $t('paymentStatus') }}</label>
                <SelectOptionPaymentStatus />
              </div>
              <div>
                <label>{{ $t('createdAt') }}</label>
                <div class="flex items-center space-x-1">
                  <div class="relative">
                    <input v-model="filterData.startDate" type="datetime-local"
                      class="w-60 rounded-lg border-none bg-gray-100 text-gray-500 pr-11" />
                    <div class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-2 text-sm">from</div>
                  </div>
                  <div class="relative">
                    <input v-model="filterData.endDate" type="datetime-local"
                      class="w-60 rounded-lg border-none bg-gray-100 text-gray-500 pr-11" />
                    <div class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-2 text-sm">to</div>
                  </div>
                </div>
              </div>
              <div>
                <label>{{ $t('expireAt') }}</label>
                <div class="flex items-center space-x-1">
                  <div class="relative">
                    <input v-model="filterData.expireAtFrom" type="datetime-local"
                      class="w-60 rounded-lg border-none bg-gray-100 text-gray-500 pr-11" />
                    <div class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-2 text-sm">from</div>
                  </div>
                  <div class="relative">
                    <input v-model="filterData.expireAtTo" type="datetime-local"
                      class="w-60 rounded-lg border-none bg-gray-100 text-gray-500 pr-11" />
                    <div class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-2 text-sm">to</div>
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
          <div @click="useModalStore().openAddCustomerTariffModal()"
            class="bg-black text-white text-base rounded-lg p-2 px-4 cursor-pointer hover:bg-black/75">
            add customer Tariff
          </div>
        </div>
      </div>
      <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden customer-tariffs-wrapper">
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('customer') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('service') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('gender') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('price') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('paymentStatus') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <CustomerTariffItem :customerTariffs="customerTariffs" :distance="distance" :target="target"
              @infinite="loadCustomerTariffs" />
          </tbody>
        </table>
        <div v-if="customerTariffs?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
