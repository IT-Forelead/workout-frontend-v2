<script setup>
import { computed, ref } from '@vue/reactivity'
import moment from 'moment'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import UserIcon from '../assets/icons/UserIcon.vue'
import CustomerTariffItem from '../components/Items/CustomerTariffItem.vue'
import CustomerTrainerTariffItem from '../components/Items/CustomerTrainerTariffItem.vue'
import PaymentItem from '../components/Items/PaymentItem.vue'
import VisitItem from '../components/Items/VisitItem.vue'
import { cleanObjectEmptyFields } from '../mixins/utils'
import CustomerTariffService from '../services/customerTariff.service'
import CustomerTrainerTariffService from '../services/customerTrainerTariff.service'
import PaymentService from '../services/payment.service'
import VisitService from '../services/visit.service'
import { useCustomerStore } from '../store/customer.store'
import { useCustomerTariffStore } from '../store/customerTariff.store'
import { useCustomerTrainerTariffStore } from '../store/customerTrainerTariff.store'
import { usePaymentStore } from '../store/payment.store'
import { useVisitStore } from '../store/visit.store'

const CUSTOMER_IMAGE_URL = import.meta.env.VITE_CUSTOMER_IMAGE_URL;

const { t } = useI18n()
const router = useRouter()

const selectedCustomer = computed(() => {
  return useCustomerStore().selectedCustomer
})

const genderTranslate = (sex) => {
  switch (sex) {
    case 'male':
      return t('male')
    case 'female':
      return t('female')
  }
}

// load Customer Tariffs
const customerTariffs = computed(() => {
  return useCustomerTariffStore().customerTariffs
})
const customerTariffTotal = ref(1)
const customerTariffTarget = ref('.customer-tariffs-wrapper')
const customerTariffDistance = ref(0)

let customerTariffPage = 0
const loadCustomerTariffs = async ($state) => {
  customerTariffPage++
  let additional = customerTariffTotal.value % 5 === 0 ? 0 : 1
  if (customerTariffTotal.value !== 0 && customerTariffTotal.value / 5 + additional >= customerTariffPage) {
    CustomerTariffService.getCustomerTariffs(
      cleanObjectEmptyFields({
        customerId: selectedCustomer.value?.id,
        page: customerTariffPage,
        limit: 5,
      })
    ).then((result) => {
      customerTariffTotal.value = result?.total
      useCustomerTariffStore().setCustomerTariffs(result?.data)
      $state.loaded()
    }).catch(() => {
      $state.error()
    })
  } else $state.loaded()
}

// load Customer Trainer Tariffs
const customerTrainerTariffs = computed(() => {
  return useCustomerTrainerTariffStore().customerTrainerTariffs
})
const customerTrainerTariffTotal = ref(1)
const customerTrainerTariffTarget = ref('.customer-trainer-tariffs-wrapper')
const customerTrainerTariffDistance = ref(0)

let customerTrainerTarifPage = 0
const loadCustomerTrainerTariffs = async ($state) => {
  customerTrainerTarifPage++
  let additional = customerTrainerTariffTotal.value % 5 === 0 ? 0 : 1
  if (customerTrainerTariffTotal.value !== 0 && customerTrainerTariffTotal.value / 5 + additional >= customerTrainerTarifPage) {
    CustomerTrainerTariffService.getCustomerTrainerTariffs(
      cleanObjectEmptyFields({
        customerId: selectedCustomer.value?.id,
        page: customerTrainerTarifPage,
        limit: 5,
      })
    ).then((result) => {
      customerTrainerTariffTotal.value = result?.total
      useCustomerTrainerTariffStore().setCustomerTrainerTariffs(result?.data)
      $state.loaded()
    }).catch(() => {
      $state.error()
    })
  } else $state.loaded()
}

// load payments
const payments = computed(() => {
  return usePaymentStore().payments
})
const paymentTotal = ref(1)
const paymentTarget = ref('.payments-wrapper')
const paymentDistance = ref(0)

let paymentPage = 0
const loadPayments = async ($state) => {
  paymentPage++
  let additional = paymentTotal.value % 5 === 0 ? 0 : 1
  if (paymentTotal.value !== 0 && paymentTotal.value / 5 + additional >= paymentPage) {
    PaymentService.getPayments(
      cleanObjectEmptyFields({
        customerId: selectedCustomer.value?.id,
        page: paymentPage,
        limit: 5,
      })
    ).then((result) => {
      paymentTotal.value = result?.total
      usePaymentStore().setPayments(result?.data)
      $state.loaded()
    }).catch(() => {
      $state.error()
    })
  } else $state.loaded()
}

// load Visits
const visits = computed(() => {
  return useVisitStore().visits
})
const visitTotal = ref(1)
const visitTarget = ref('.visits-wrapper')
const visitDistance = ref(0)

let visitPage = 0
const loadVisits = async ($state) => {
  visitPage++
  let additional = visitTotal.value % 10 === 0 ? 0 : 1
  if (visitTotal.value !== 0 && visitTotal.value / 10 + additional >= visitPage) {
    VisitService.getVisits(
      cleanObjectEmptyFields({
        customerId: selectedCustomer.value?.id,
        page: visitPage,
        limit: 10,
      })
    ).then((result) => {
      visitTotal.value = result?.total
      useVisitStore().setVisits(result?.data)
      $state.loaded()
    }).catch(() => {
      $state.error()
    })
  } else $state.loaded()
}

onMounted(() => {
  if (selectedCustomer.value?.id) {
    useCustomerTariffStore().clearStore()
    useCustomerTrainerTariffStore().clearStore()
    usePaymentStore().clearStore()
    useVisitStore().clearStore()
  } else router.push('/customers')
})
</script>
<template>
  <div class="px-4 py-2">
    <div class="bg-white rounded p-5 space-y-4">
      <div class="flex items-center space-x-4">
        <div v-if="selectedCustomer?.image">
          <img :src="CUSTOMER_IMAGE_URL + selectedCustomer?.image" alt="#"
            class="object-cover w-32 h-32 rounded-lg border duration-500 cursor-zoom-out hover:object-scale-down" />
        </div>
        <div v-else>
          <UserIcon class="w-32 h-32 rounded-lg text-gray-500 border p-1.5" />
        </div>
        <div>
          <div class="flex items-center space-x-2">
            <div class="text-base text-gray-500">
              {{ $t('customer') }}:
            </div>
            <div class="text-lg font-medium capitalize">
              {{ selectedCustomer?.firstname + ' ' + selectedCustomer?.lastname }}
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="text-base text-gray-500">
              {{ $t('phone') }}:
            </div>
            <div class="text-lg font-medium">
              {{ selectedCustomer?.phone }}
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="text-base text-gray-500">
              {{ $t('gender') }}:
            </div>
            <div class="text-lg font-medium">
              {{ genderTranslate(selectedCustomer?.gender) }}
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="text-base text-gray-500">
              {{ $t('qrcode') }}:
            </div>
            <div v-if="selectedCustomer?.barcode" class="text-lg font-medium">
              {{ selectedCustomer?.barcode }}
            </div>
            <div v-else class="text-base font-medium uppercase">
              {{ $t('noQrCodeAvailable') }}
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="text-base text-gray-500">
              {{ $t('createdAt') }}:
            </div>
            <div class="text-lg font-medium">
              {{ moment(selectedCustomer?.createdAt).format('DD/MM/YYYY H:mm') }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="text-xl font-bold">{{ $t('customerTariffs') }}</div>
        <div class="max-h-48 overflow-auto xxl:overflow-x-hidden customer-tariffs-wrapper">
          <table class="min-w-max w-full table-auto">
            <thead class="sticky z-10 top-0 bg-white shadow">
              <tr class="text-gray-600 capitalize text-lg leading-normal">
                <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
                <th class="py-2 px-4 text-left">{{ $t('service') }}</th>
                <th class="py-2 px-4 text-left">{{ $t('duration') }}</th>
                <th class="py-2 px-4 text-left">{{ $t('price') }}</th>
                <th class="py-2 px-4 text-center">{{ $t('monthlyVisit') }}</th>
                <th class="py-2 px-4 text-center">{{ $t('paymentStatus') }}</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <CustomerTariffItem :customerTariffs="customerTariffs" :distance="customerTariffDistance"
                :target="customerTariffTarget" @infinite="loadCustomerTariffs" />
            </tbody>
          </table>
          <div v-if="customerTariffs?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
        </div>
      </div>
      <div>
        <div class="text-xl font-bold">{{ $t('customerTrainerTariffs') }}</div>
        <div class="max-h-48 overflow-auto xxl:overflow-x-hidden customer-trainer-tariffs-wrapper">
          <table class="min-w-max w-full table-auto">
            <thead class="sticky z-10 top-0 bg-white shadow">
              <tr class="text-gray-600 capitalize text-lg leading-normal">
                <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
                <th class="py-2 px-4 text-left">{{ $t('trainer') }}</th>
                <th class="py-2 px-4 text-left">{{ $t('service') }}</th>
                <th class="py-2 px-4 text-left">{{ $t('duration') }}</th>
                <th class="py-2 px-4 text-left">{{ $t('price') }}</th>
                <th class="py-2 px-4 text-center">{{ $t('monthlyVisit') }}</th>
                <th class="py-2 px-4 text-center">{{ $t('paymentStatus') }}</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <CustomerTrainerTariffItem :customerTrainerTariffs="customerTrainerTariffs"
                :distance="customerTrainerTariffDistance" :target="customerTrainerTariffTarget"
                @infinite="loadCustomerTrainerTariffs" />
            </tbody>
          </table>
          <div v-if="customerTrainerTariffs?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
        </div>
      </div>
      <div>
        <div class="text-xl font-bold">{{ $t('paymentsReport') }}</div>
        <div class="max-h-48 overflow-auto xxl:overflow-x-hidden payments-wrapper">
          <table class="min-w-max w-full table-auto">
            <thead class="sticky z-10 top-0 bg-white shadow">
              <tr class="text-gray-600 capitalize text-lg leading-normal">
                <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
                <th class="py-2 px-4 text-left">{{ $t('service') }}</th>
                <th class="py-2 px-4 text-left">{{ $t('duration') }}</th>
                <th class="py-2 px-4 text-left">{{ $t('createdAt') }}</th>
                <th class="py-2 px-4 text-left">{{ $t('price') }}</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <PaymentItem :payments="payments" :distance="paymentDistance" :target="paymentTarget"
                @infinite="loadPayments" />
            </tbody>
          </table>
          <div v-if="payments?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
        </div>
      </div>
      <div>
        <div class="text-xl font-bold">{{ $t('visits') }}</div>
        <div class="max-h-80 overflow-auto xxl:overflow-x-hidden visits-wrapper">
          <table class="min-w-max w-full table-auto">
            <thead class="sticky z-10 top-0 bg-white shadow">
              <tr class="text-gray-600 capitalize text-lg leading-normal">
                <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
                <th class="py-2 px-4 text-left">{{ $t('visitTime') }}</th>
                <th class="py-2 px-4 text-center">{{ $t('visitType') }}</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <VisitItem :visits="visits" :distance="visitDistance" :target="visitTarget" @infinite="loadVisits" />
            </tbody>
          </table>
          <div v-if="visits?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
