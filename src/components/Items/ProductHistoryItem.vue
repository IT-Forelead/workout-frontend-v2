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
  productHistories: { type: Array, required: true },
})

const { productHistories } = toRefs(props)

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

onMounted(() => {
  payload.value = parseJwt()
})

const productTypeTranslate = (type) => {
  switch (type) {
    case 'chocolate_bar':
      return t('coffeeBar')
    case 'water':
      return t('water')
  }
}

const productHistoryTypeTranslate = (type) => {
  switch (type) {
    case 'bought':
      return t('bought')
    case 'sold':
      return t('sold')
  }
}
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(product, idx) in productHistories"
    :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      {{ product?.product?.name + ' - ' + productTypeTranslate(product?.product?.productType) }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      {{ productHistoryTypeTranslate(product?.productHistory?.productHistoryType) }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      {{ moment(product?.productHistory?.createdAt).format('DD/MM/YYYY H:mm') }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">{{ product?.productHistory?.count }}</td>
    <td v-motion-pop class="py-2 px-4 text-center"></td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
    <td v-motion-pop colspan="10">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
