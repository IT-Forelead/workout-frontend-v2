<script setup>
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { onMounted, ref, toRefs } from 'vue'
import { parseJwt } from '../../mixins/utils.js'
import moment from 'moment'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import UserIcon from '../Icons/UserIcon.vue'

const { t } = useI18n()

const URL = import.meta.env.VITE_CUSTOMER_IMAGE_URL;

const router = useRouter()
const payload = ref({})

const props = defineProps({
  soldProducts: { type: Array, required: true },
})

const { soldProducts } = toRefs(props)

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

const productTypeTranslate = (type) => {
  switch (type) {
    case 'water':
      return t('water')
  }
}

onMounted(() => {
  payload.value = parseJwt()
})
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(soldProduct, idx) in soldProducts"
    :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center space-x-2">
        <div v-if="soldProduct?.customer?.image">
          <img :src="URL + soldProduct?.customer?.image" alt="#" class="object-cover w-9 h-9 rounded-full border" />
        </div>
        <div v-else>
          <UserIcon class="w-9 h-9 rounded-full border p-1.5" />
        </div>
        <div>
          <div class="text-lg font-medium capitalize">
            {{ soldProduct?.customer?.firstname + ' ' + soldProduct?.customer?.lastname }}
          </div>
          <div class="text-sm text-gray-500">
            {{ soldProduct?.customer?.phone }}
          </div>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      {{ productTypeTranslate(soldProduct?.product?.productType) + ' ' + soldProduct?.product?.quantity + 'L' }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      {{ moment(soldProduct?.product?.createdAt).format('DD/MM/YYYY H:mm') }}
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
