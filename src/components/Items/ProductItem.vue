<script setup>
import moment from 'moment'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { onMounted, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { parseJwt } from '../../mixins/utils.js'
import TrashIcon from '../../assets/icons/TrashIcon.vue'
import EditIcon from '../../assets/icons/EditIcon.vue'
import { useProductStore } from '../../store/product.store.js'
import { useModalStore } from '../../store/modal.store.js'

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

const openEditModal = (product) => {
  useProductStore().setSelectedProduct(product)
  useModalStore().openEditProductModal()
}

const openDeleteModal = (product) => {
  useProductStore().setSelectedProduct(product)
  useModalStore().openDeleteProductModal()
}
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(product, idx) in products"
    :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ product?.name }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ productTypeTranslate(product?.productType) }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      {{ moment(product?.updatedAt).format('DD/MM/YYYY H:mm') }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">{{ product?.count }}</td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex item-center justify-center">
        <div @click="openEditModal(product)" class="w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <EditIcon class="w-6 h-6" />
        </div>
        <div @click="openDeleteModal(product)"
             class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
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
