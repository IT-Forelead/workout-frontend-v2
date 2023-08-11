<script setup>
import moment from 'moment'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { onMounted, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { parseJwt } from '../../mixins/utils.js'

const { t } = useI18n()

const router = useRouter()
const payload = ref({})

const props = defineProps({
  smsMessages: { type: Array, required: true },
})

const { smsMessages } = toRefs(props)

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

const deliveryStatusTranslate = (status) => {
  switch (status) {
    case 'sent':
      return t('sent')
    case 'delivered':
      return t('delivered')
    case 'failed':
      return t('failed')
    case 'undefined':
      return t('undefined')
  }
}

const deliveryStatusColor = (status) => {998668324768
  switch (status) {
    case 'sent':
      return 'bg-orange-500 text-white'
    case 'delivered':
      return 'bg-green-500 text-white'
    case 'failed':
      return 'bg-red-500 text-white'
    case 'undefined':
      return 'bg-teal-500 text-white'
  }
}

const messageTypeTranslate = (type) => {
  switch (type) {
    case 'registration':
      return t('registration')
    case 'reset_password':
      return t('resetPassword')
    case 'sent_code':
      return t('sentCode')
    case 'payment':
      return t('payment')
  }
}

onMounted(() => {
  payload.value = parseJwt()
})
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(smsMessage, idx) in smsMessages"
    :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ smsMessage?.phone }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ smsMessage?.text }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      {{ moment(smsMessage?.sentDate).format('DD/MM/YYYY H:mm') }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ messageTypeTranslate(smsMessage?.messageType) }}</td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <span class="p-1.5 px-3 text-sm rounded-full" :class="deliveryStatusColor(smsMessage?.deliveryStatus)">
        {{ deliveryStatusTranslate(smsMessage?.deliveryStatus) }}
      </span>
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
