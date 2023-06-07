<script setup>
import { computed, ref } from '@vue/reactivity'
import moment from 'moment'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import UserIcon from '../components/Icons/UserIcon.vue'
import CustomerTariffItem from '../components/Items/CustomerTariffItem.vue'
import VisitItem from '../components/Items/VisitItem.vue'
import { cleanObjectEmptyFields } from '../mixins/utils'
import CustomerTariffService from '../services/customerTariff.service'
import VisitService from '../services/visit.service'
import { useCustomerStore } from '../store/customer.store'
import { useCustomerTariffStore } from '../store/customerTariff.store'
import { useVisitStore } from '../store/visit.store'
import { useProductStore } from '../store/product.store.js'

const { t } = useI18n()

const CUSTOMER_IMAGE_URL = import.meta.env.VITE_CUSTOMER_IMAGE_URL;

const router = useRouter()

const selectedProduct = computed(() => {
  return useProductStore().selectedProduct
})


onMounted(() => {
  if (selectedProduct.value?.id) {
    useProductStore().clearStore()
    // useVisitStore().clearStore()
  } else router.push('/products')
})
</script>
<template>
  <div class="px-4 py-2">
    <div class="bg-white rounded p-5 space-y-4">
      <div class="flex items-center space-x-4">
        <div v-if="selectedProduct?.image">
          <img :src="CUSTOMER_IMAGE_URL + selectedProduct?.image" alt="#"
               class="object-cover w-32 h-32 rounded-lg border duration-500 cursor-zoom-out hover:object-scale-down" />
        </div>
        <div v-else>
          <UserIcon class="w-32 h-32 rounded-lg text-gray-500 border p-1.5" />
        </div>
        <div>
          <div class="flex items-center space-x-2">
            <div class="text-base text-gray-500">
              {{ $t('product') }}:
            </div>
            <div class="text-lg font-medium capitalize">
              {{ selectedProduct?.productName }}
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="text-base text-gray-500">
              {{ $t('type') }}:
            </div>
            <div class="text-lg font-medium">
              {{ selectedProduct?.productType }}
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="text-base text-gray-500">
              {{ $t('number') }}:
            </div>
            <div class="text-lg font-medium">
              {{ selectedProduct?.productNumber }}
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <div class="text-base text-gray-500">
              {{ $t('createdAt') }}:
            </div>
            <div class="text-lg font-medium">
              {{ moment(selectedProduct?.createdAt).format('DD/MM/YYYY H:mm') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
