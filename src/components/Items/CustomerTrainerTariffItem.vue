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
import UserIcon from '../../assets/icons/UserIcon.vue'
import CheckIcon from '../../assets/icons/CheckCircleIcon.vue'
import WarningCircleIcon from '../../assets/icons/WarningCircleIcon.vue'

const { t } = useI18n()

const URL = import.meta.env.VITE_CUSTOMER_IMAGE_URL;

const router = useRouter()
const payload = ref({})

const props = defineProps({
  customerTrainerTariffs: { type: Array, required: true },
})

const { customerTrainerTariffs } = toRefs(props)

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
</script>
<template>
  <tr v-for="(tariff, idx) in customerTrainerTariffs" :key="idx"
    class="border-y border-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100 text-lg font-medium dark:border-gray-600">
    <td v-motion-pop class="text-center dark:text-gray-300">{{ idx + 1 }}</td>
    <td v-motion-pop v-if="router?.currentRoute?.value?.path !== '/customer'" class="py-2 px-4 text-left">
      <div class="flex items-center space-x-2">
        <div v-if="tariff?.customer?.image">
          <img :src="URL + tariff?.customer?.image" alt="#" class="object-cover w-9 h-9 rounded-full border" />
        </div>
        <div v-else>
          <UserIcon class="w-9 h-9 rounded-full border p-1.5 dark:border-gray-600 dark:text-gray-300" />
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
      {{ tariff?.trainerService?.trainerFirstName + ' ' + tariff?.trainerService?.trainerLastName }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="dark:text-gray-300">
        {{ tariff?.trainerService?.name }}
      </div>
      <div class="text-sm dark:text-gray-300">
        {{ durationDayTranslate(tariff?.trainerService?.durationDay) + ' (' +
          monthlyVisitTranslate(tariff?.trainerService?.monthlyVisit) + ')' }}
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left dark:text-gray-300">
      <div class="flex items-center space-x-2">
        <div>
          <div class="flex items-center space-x-1">
            <CalendarCheckIcon class="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <div>{{ moment(tariff?.customerTrainerTariff?.createdAt).format('DD/MM/YYYY H:mm') }}</div>
          </div>
          <div class="flex items-center space-x-1">
            <CalendarXIcon class="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <div>{{ moment(tariff?.customerTrainerTariff?.expireAt).format('DD/MM/YYYY H:mm') }}</div>
          </div>
        </div>
        <div v-if="moment().isBefore(tariff?.customerTariff?.expireAt)" class="">
          <CheckIcon class="w-5 h-5 text-green-700" />
        </div>
        <div v-else>
          <WarningCircleIcon class="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left dark:text-gray-300">
      <div class="flex items-center space-x-1">
        <div class="text-sm text-gray-500 dark:text-gray-300">
          {{ $t('total') }}:
        </div>
        <div>
          {{ useMoneyFormatter(tariff?.customerTrainerTariff?.totalPrice) }}
        </div>
      </div>
      <div class="flex items-center space-x-1">
        <div class="text-sm text-gray-500 dark:text-gray-300">
          {{ $t('paid') }}:
        </div>
        <div>
          {{ useMoneyFormatter(tariff?.customerTrainerTariff?.pricePaid) }}
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center dark:text-gray-300">
      {{ tariff?.numberOfVisit + " / " + tariff?.trainerService?.monthlyVisit }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <span class="p-1.5 px-3 text-sm rounded-full inline-block w-28"
        :class="paymentStatusColor(tariff?.customerTrainerTariff?.paymentStatus)">
        {{ paymentStatusTranslate(tariff?.customerTrainerTariff?.paymentStatus) }}
      </span>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
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
  </tr>
</template>
