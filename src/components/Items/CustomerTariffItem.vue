<script setup>
import moment from 'moment'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { onMounted, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import useMoneyFormatter from '../../mixins/currencyFormatter.js'
import { parseJwt } from '../../mixins/utils.js'
import CalendarCheckIcon from '../../assets/icons/CalendarCheckIcon.vue'
import CalendarXIcon from '../../assets/icons/CalendarXIcon.vue'
import CheckCircleBoldIcon from '../../assets/icons/CheckCircleBoldIcon.vue'
import WarningCircleBoldIcon from '../../assets/icons/WarningCircleBoldIcon.vue'
import UserIcon from '../../assets/icons/UserIcon.vue'
import EditIcon from '../../assets/icons/EditIcon.vue'
import { useCustomerTariffStore } from '../../store/customerTariff.store'
import { useModalStore } from '../../store/modal.store'

const { t } = useI18n()

const URL = import.meta.env.VITE_CUSTOMER_IMAGE_URL;

const router = useRouter()
const payload = ref({})

const props = defineProps({
  customerTariffs: { type: Array, required: true },
})

const { customerTariffs } = toRefs(props)

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

onMounted(() => {
  payload.value = parseJwt()
})

const paymentStatusTranslate = (status) => {
  switch (status) {
    case 'fully_paid':
      return t('fullyPaid')
    case 'not_paid':
      return t('notPaid')
    case 'partially_paid':
      return t('partiallyPaid')
    case 'canceled':
      return t('canceled')
  }
}

const paymentStatusColor = (status) => {
  switch (status) {
    case 'fully_paid':
      return 'bg-green-500 text-white'
    case 'not_paid':
      return 'bg-red-500 text-white'
    case 'partially_paid':
      return 'bg-orange-500 text-white'
    case 'canceled':
      return 'bg-teal-500 text-white'
  }
}

const durationDayTranslate = (n) => {
  switch (n) {
    case 1:
      return t('oneDay')
    case 30:
      return t('oneMonth')
    case 90:
      return t('threeMonths')
    case 180:
      return t('sixMonths')
    case 365:
      return t('oneYear')
  }
}

const monthlyVisitTranslate = (n) => {
  switch (n) {
    case 30:
      return t('everyDay')
    case 15:
      return t('fifteenDays')
  }
}

const openAddFakeVisitModal = (customerTariff) => {
  useCustomerTariffStore().setSelectedCustomerTariff(customerTariff)
  useModalStore().openAddFakeVisitModal()
}
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 text-lg font-medium dark:border-gray-600" v-for="(tariff, idx) in customerTariffs"
    :key="idx">
    <td v-motion-pop class="text-center dark:text-gray-300">{{ idx + 1 }}</td>
    <td v-motion-pop v-if="router?.currentRoute?.value?.path !== '/customer'" class="py-2 px-4 text-left">
      <div class="flex items-center space-x-2">
        <div v-if="tariff?.customer?.image">
          <img :src="URL + tariff?.customer?.image" alt="#" class="object-cover w-9 h-9 rounded-full border" />
        </div>
        <div v-else>
          <UserIcon class="w-9 h-9 rounded-full border dark:border-gray-600 p-1.5 dark:text-gray-300" />
        </div>
        <div>
          <div class="text-lg font-medium capitalize dark:text-gray-300">
            {{ tariff?.customer?.firstname + ' ' + tariff?.customer?.lastname }}
          </div>
          <div class="dark:text-gray-300">{{ tariff?.customer?.phone }}</div>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left dark:text-gray-300">
      <div class="">
        {{ tariff?.service?.name }}
      </div>
      <div class="text-sm">
        {{ durationDayTranslate(tariff?.service?.durationDay) + ' (' +
          monthlyVisitTranslate(tariff?.service?.monthlyVisit) + ')' }}
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left dark:text-gray-300">
      <div class="flex items-center space-x-2">
        <div>
          <div class="flex items-center space-x-1">
            <CalendarCheckIcon class="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <div>{{ moment(tariff?.customerTariff?.createdAt).format('DD/MM/YYYY H:mm') }}</div>
          </div>
          <div class="flex items-center space-x-1">
            <CalendarXIcon class="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <div>{{ moment(tariff?.customerTariff?.expireAt).format('DD/MM/YYYY H:mm') }}</div>
          </div>
        </div>
        <div v-if="moment().isBefore(tariff?.customerTariff?.expireAt)">
          <CheckCircleBoldIcon class="w-6 h-6 text-green-700" />
        </div>
        <div v-else>
          <WarningCircleBoldIcon class="w-6 h-6 text-red-500" />
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left dark:text-gray-300">
      <div class="flex items-center space-x-1">
        <div class="text-sm text-gray-500 dark:text-gray-300">
          {{ $t('total') }}:
        </div>
        <div>
          {{ useMoneyFormatter(tariff?.customerTariff?.totalPrice) }}
        </div>
      </div>
      <div class="flex items-center space-x-1">
        <div class="text-sm text-gray-500 dark:text-gray-300">
          {{ $t('paid') }}:
        </div>
        <div>
          {{ useMoneyFormatter(tariff?.customerTariff?.pricePaid) }}
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center dark:text-gray-300">
      <div class="flex item-center justify-center space-x-2">
        <div>
          {{ tariff?.numberOfVisit + " / " + tariff?.service?.monthlyVisit }}
        </div>
        <div @click="openAddFakeVisitModal(tariff)"
          class="w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <EditIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <span class="p-1.5 inline-block w-28 px-3 text-sm rounded-full"
        :class="paymentStatusColor(tariff?.customerTariff?.paymentStatus)">
        {{ paymentStatusTranslate(tariff?.customerTariff?.paymentStatus) }}
      </span>
    </td>
    <td v-motion-pop v-if="router?.currentRoute?.value?.path !== '/customer'" class="py-2 px-4 text-center">
      <!-- <div class="flex item-center justify-center">
          <div class="w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
            <EditIcon class="w-6 h-6" />
          </div>
          <div class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
            <TrashIcon class="w-6 h-6" />
          </div>
        </div> -->
    </td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300">
    <td v-motion-pop colspan="10">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr></template>
