<script setup>
import moment from 'moment'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { onMounted, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { parseJwt } from '../../mixins/utils.js'
import UserIcon from '../../assets/icons/UserIcon.vue'
import WarningCircleBoldIcon from '../../assets/icons/WarningCircleBoldIcon.vue'
import CheckCircleBoldIcon from '../../assets/icons/CheckCircleBoldIcon.vue'

const { t } = useI18n()

const URL = import.meta.env.VITE_CUSTOMER_IMAGE_URL;

const router = useRouter()
const payload = ref({})

const props = defineProps({
  visits: { type: Array, required: true },
})

const { visits } = toRefs(props)

onMounted(() => {
  payload.value = parseJwt()
})

const visitTypeTranslate = (type) => {
  switch (type) {
    case 'come_in':
      return t('comeIn')
    case 'go_out':
      return t('goOut')
  }
}

const visitTypeColor = (type) => {
  switch (type) {
    case 'come_in':
      return 'bg-green-500 text-white'
    case 'go_out':
      return 'bg-orange-500 text-white'
  }
}
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium dark:border-gray-600 dark:hover:bg-gray-800" v-for="(visit, idx) in visits" :key="idx">
    <td v-motion-fade class="text-center">{{ idx + 1 }}</td>
    <td v-motion-fade v-if="router?.currentRoute?.value?.path !== '/customer'" class="py-2 px-4 text-left">
      <div class="flex items-center space-x-2">
        <div v-if="visit?.customer?.image">
          <img :src="URL + visit?.customer?.image" alt="#" class="object-cover w-9 h-9 rounded-full border" />
        </div>
        <div v-else>
          <UserIcon class="w-9 h-9 rounded-full border p-1.5 dark:bg-gray-900 dark:border-gray-600" />
        </div>
        <div>
          <div class="text-lg font-medium capitalize">
            {{ visit?.customer?.firstname + ' ' + visit?.customer?.lastname }}
          </div>
          <div>{{ visit?.customer?.phone }}</div>
        </div>
      </div>
    </td>
    <td v-motion-fade class="py-2 px-4 text-center">
      {{ visit?.numberOfVisit + ' / ' + visit?.monthlyVisitOfTariff }}
    </td>
    <td v-motion-fade class="py-2 px-4 text-left">
      <div v-if="visit?.monthlyVisitOfTariff == 0" class="flex items-center space-x-2">
        <WarningCircleBoldIcon class="w-5 h-5 text-red-500" />
        <div class="text-xs w-44">{{ $t('tariffHasExpired') }}</div>
      </div>
      <div v-else class="flex items-center space-x-2">
        <CheckCircleBoldIcon class="w-5 h-5 text-green-700" />
        <div class="text-xs w-44">{{ $t('tariffHasNotExpired') }}</div>
      </div>
    </td>
    <td v-motion-fade class="py-2 px-4 text-left">
      {{ moment(visit?.visit?.createdAt).format('DD/MM/YYYY H:mm') }}
    </td>
    <td v-motion-fade class="py-2 px-4 text-center">
      <span class="p-1.5 px-3 text-sm rounded-full" :class="visitTypeColor(visit?.visit?.visitType)">
        {{ visitTypeTranslate(visit?.visit?.visitType) }}
      </span>
    </td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300">
    <td v-motion-fade colspan="10">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
