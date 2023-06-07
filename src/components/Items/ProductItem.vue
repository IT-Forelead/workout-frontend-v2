<script setup>
import moment from 'moment'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { onMounted, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { parseJwt } from '../../mixins/utils.js'
import { useModalStore } from '../../store/modal.store'
import UserIcon from '../Icons/UserIcon.vue'
import QrCodeIcon from '../Icons/QrCodeIcon.vue'
import EyeIcon from '../Icons/EyeIcon.vue'
import EditIcon from '../Icons/EditIcon.vue'
import TrashIcon from '../Icons/TrashIcon.vue'
import { useCustomerStore } from '../../store/customer.store'
import { useProductStore } from '../../store/product.store.js'

const { t } = useI18n()

const router = useRouter()
const payload = ref({})

const props = defineProps({
  products: { type: Array, required: true },
})

const { products } = toRefs(props)

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}


</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(product, idx) in products"
      :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center space-x-2">

        <span class="text-lg font-medium capitalize">
          {{ product?.productName }}
        </span>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-2 text-left">{{}}</td>
    <td v-motion-pop class="py-2 px-2 text-left">{{}}</td>
    <td v-motion-pop class="py-2 px-2 text-left">
      {{ moment(product?.createdAt).format('DD/MM/YYYY H:mm') }}
    </td>
    <td v-motion-pop class="py-2 px-2 text-center">
      <div class="flex item-center justify-center">
        <div @click="openProductPage(product)" class="w-4 mr-3 text-blue-500 hover:text-purple-500 transform hover:scale-110 cursor-pointer">
          <EyeIcon class="w-6 h-6" />
        </div>
        <div @click="openAddQrCodeModal(customer)" class="w-4 mr-3 transform hover:scale-110 cursor-pointer" :class="customer?.barcode ? 'text-blue-500 hover:text-purple-500' : 'text-red-500 hover:text-red-600'">
          <QrCodeIcon class="w-6 h-6" />
        </div>
        <div @click="openEditModal(customer)" class="w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <EditIcon class="w-6 h-6" />
        </div>
        <div @click="openDeleteModal(customer)" class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
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
