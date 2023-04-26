<script setup>
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import useMoneyFormatter from '../../mixins/currencyFormatter.js'
import { paymentStatusColor, paymentStatusTranslate } from '../../mixins/paymentUtils.js'
import { durationDayTranslate, monthlyArrivalTranslate } from '../../mixins/serviceUtils.js'
import { onMounted, ref, toRefs } from 'vue'
import { parseJwt } from '../../mixins/utils.js'
import { useRouter } from 'vue-router'
import moment from 'moment'
import UserIcon from '../Icons/UserIcon.vue'
import CalendarCheckIcon from '../Icons/CalendarCheckIcon.vue'
import CalendarXIcon from '../Icons/CalendarXIcon.vue'
import TrashIcon from '../Icons/TrashIcon.vue'
import EditIcon from '../Icons/EditIcon.vue'

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
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(customer, idx) in customerTariffs"
    :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center space-x-2">
        <UserIcon class="w-9 h-9 rounded-full border p-1.5" />
        <div>
          <div class="text-lg font-medium capitalize">
            {{ customer?.customer?.firstname + ' ' + customer?.customer?.lastname }}
          </div>
          <div>{{ customer?.customer?.phone }}</div>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="">
        {{ customer?.service?.name }}
      </div>
      <div class="text-sm">
        {{ durationDayTranslate(customer?.service?.durationDay) + ' (' + monthlyArrivalTranslate(customer?.service?.monthlyArrival) + ')' }}
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center space-x-1">
        <CalendarCheckIcon class="w-5 h-5 text-gray-500" />
        <div>
          {{ moment(customer?.customerTariff?.createdAt).format('DD/MM/YYYY H:mm') }}
        </div>
      </div>
      <div class="flex items-center space-x-1">
        <CalendarXIcon class="w-5 h-5 text-gray-500" />
        <div>
          {{ moment(customer?.customerTariff?.expireAt).format('DD/MM/YYYY H:mm') }}
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center space-x-1">
        <div class="text-sm text-gray-500">
          Total:
        </div>
        <div>
          {{ useMoneyFormatter(customer?.customerTariff?.totalPrice) }}
        </div>
      </div>
      <div class="flex items-center space-x-1">
        <div class="text-sm text-gray-500">
          Paid:
        </div>
        <div>
          {{ useMoneyFormatter(customer?.customerTariff?.pricePaid) }}
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <span class="p-1.5 px-3 text-sm rounded-full" :class="paymentStatusColor(customer?.customerTariff?.paymentStatus)">
        {{ paymentStatusTranslate(customer?.customerTariff?.paymentStatus) }}
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
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
    <td v-motion-pop colspan="10">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
