<script setup>
import moment from 'moment'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { onMounted, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { parseJwt } from '../../mixins/utils.js'
import UserIcon from '../Icons/UserIcon.vue'
import QrCodeIcon from '../Icons/QrCodeIcon.vue'

const { t } = useI18n()

const URL = import.meta.env.VITE_CUSTOMER_IMAGE_URL;

const router = useRouter()
const payload = ref({})

const props = defineProps({
  customers: { type: Array, required: true },
})

const { customers } = toRefs(props)

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

const genderTranslate = (sex) => {
  switch (sex) {
    case 'male':
      return t('male')
    case 'female':
      return t('female')
  }
}

onMounted(() => {
  payload.value = parseJwt()
})
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(customer, idx) in customers"
    :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center space-x-2">
        <div v-if="customer?.image">
          <img :src="URL + customer?.image" alt="#"
            class="object-cover w-9 h-9 rounded-full border duration-500 cursor-zoom-out hover:object-scale-down" />
        </div>
        <div v-else>
          <UserIcon class="w-9 h-9 rounded-full border p-1.5" />
        </div>
        <span class="text-lg font-medium capitalize">
          {{ customer?.firstname + ' ' + customer?.lastname }}
        </span>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ customer?.phone }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ genderTranslate(customer?.gender) }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      {{ moment(customer?.createdAt).format('DD/MM/YYYY H:mm') }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex item-center justify-center">
        <div class="w-4 mr-3 transform hover:scale-110 cursor-pointer" :class="customer?.barcode ? 'text-blue-500 hover:text-purple-500' : 'text-red-500 hover:text-red-600'">
          <QrCodeIcon class="w-6 h-6" />
        </div>
        <!-- <div class="w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <EditIcon class="w-6 h-6" />
        </div>
        <div class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div> -->
      </div>
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
