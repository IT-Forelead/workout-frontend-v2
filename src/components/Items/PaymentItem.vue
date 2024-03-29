<script setup>
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { onMounted, ref, toRefs } from 'vue'
import { parseJwt } from '../../mixins/utils.js'
import moment from 'moment'
import useMoneyFormatter from '../../mixins/currencyFormatter.js'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import UserIcon from '../../assets/icons/UserIcon.vue'
import CalendarCheckIcon from '../../assets/icons/CalendarCheckIcon.vue'
import CalendarXIcon from '../../assets/icons/CalendarXIcon.vue'

const { t } = useI18n()

const URL = import.meta.env.VITE_CUSTOMER_IMAGE_URL;

const router = useRouter()
const payload = ref({})

const props = defineProps({
  payments: { type: Array, required: true },
})

const { payments } = toRefs(props)

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
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

onMounted(() => {
  payload.value = parseJwt()
})
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium dark:hover:bg-gray-800 dark:border-gray-600" v-for="(payment, idx) in payments"
    :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop v-if="router?.currentRoute?.value?.path !== '/customer'" class="py-2 px-4 text-left">
      <div class="flex items-center space-x-2">
        <div v-if="payment?.customer?.image">
          <img :src="URL + payment?.customer?.image" alt="#" class="object-cover w-9 h-9 rounded-full border" />
        </div>
        <div v-else>
          <UserIcon class="w-9 h-9 rounded-full border p-1.5 dark:border-gray-600" />
        </div>
        <div>
          <div class="text-lg font-medium capitalize">
            {{ payment?.customer?.firstname + ' ' + payment?.customer?.lastname }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-300">
            {{ payment?.customer?.phone }}
          </div>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div v-if="payment?.customerTrainerTariff">
        <div>
          {{ payment?.trainerService?.trainerFirstName + ' ' + payment?.trainerService?.trainerLastName }}
        </div>
        <div>
          {{ payment?.trainerService?.name }}
        </div>
        <div class="text-sm">
          {{ durationDayTranslate(payment?.trainerService?.durationDay) + ' (' +
            monthlyVisitTranslate(payment?.trainerService?.monthlyVisit) + ')' }}
        </div>
      </div>
      <div v-else>
        <div>
          {{ payment?.service?.name }}
        </div>
        <div class="text-sm">
          {{ durationDayTranslate(payment?.service?.durationDay) + ' (' +
            monthlyVisitTranslate(payment?.service?.monthlyVisit) + ')' }}
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div v-if="payment?.customerTrainerTariff">
        <div class="flex items-center space-x-1">
          <CalendarCheckIcon class="w-5 h-5 text-gray-500 dark:text-gray-300" />
          <div>
            {{ moment(payment?.customerTrainerTariff?.createdAt).format('DD/MM/YYYY H:mm') }}
          </div>
        </div>
        <div class="flex items-center space-x-1">
          <CalendarXIcon class="w-5 h-5 text-gray-500 dark:text-gray-300" />
          <div>
            {{ moment(payment?.customerTrainerTariff?.expireAt).format('DD/MM/YYYY H:mm') }}
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flex items-center space-x-1">
          <CalendarCheckIcon class="w-5 h-5 text-gray-500" />
          <div>
            {{ moment(payment?.customerTariff?.createdAt).format('DD/MM/YYYY H:mm') }}
          </div>
        </div>
        <div class="flex items-center space-x-1">
          <CalendarXIcon class="w-5 h-5 text-gray-500" />
          <div>
            {{ moment(payment?.customerTariff?.expireAt).format('DD/MM/YYYY H:mm') }}
          </div>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      {{ moment(payment?.payment?.createdAt).format('DD/MM/YYYY H:mm') }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      {{ useMoneyFormatter(payment?.payment?.price) }}
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
