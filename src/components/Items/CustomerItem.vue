<script setup>
import moment from 'moment'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { onMounted, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { parseJwt } from '../../mixins/utils.js'
import { useModalStore } from '../../store/modal.store'
import UserIcon from '../../assets/icons/UserIcon.vue'
import QrCodeIcon from '../../assets/icons/QrCodeIcon.vue'
import EyeIcon from '../../assets/icons/EyeIcon.vue'
import EditIcon from '../../assets/icons/EditIcon.vue'
import TrashIcon from '../../assets/icons/TrashIcon.vue'
import MoneyIcon from '../../assets/icons/MoneyIcon.vue'
import { useCustomerStore } from '../../store/customer.store'
import { useDropdownStore } from '../../store/dropdown.store.js'

const { t } = useI18n()

const CUSTOMER_IMAGE_URL = import.meta.env.VITE_CUSTOMER_IMAGE_URL;

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

const openAddQrCodeModal = (customer) => {
  useCustomerStore().setSelectedCustomer(customer)
  useModalStore().openAddQrCodeModal()
}

const openEditModal = (customer) => {
  useCustomerStore().setSelectedCustomer(customer)
  useModalStore().openEditCustomerModal()
}

const openDeleteModal = (customer) => {
  useCustomerStore().setSelectedCustomer(customer)
  useModalStore().openDeleteCustomerModal()
}
const addTariffWithPaymentModal = (customer) => {
  useDropdownStore().setSelectCustomerOption(customer)
  useModalStore().openAddTariffWithPaymentModal()
}

const openCustomerPage = (customer) => {
  useCustomerStore().setSelectedCustomer(customer)
  router.push('/customer')
}

onMounted(() => {
  payload.value = parseJwt()
})
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-lg font-medium dark:border-gray-600" v-for="(customer, idx) in customers"
    :key="idx">
    <td v-motion-pop class="text-center dark:text-gray-300">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left dark:text-gray-300">
      <div class="flex items-center space-x-2 dark:text-gray-300">
        <div v-if="customer?.image">
          <img :src="CUSTOMER_IMAGE_URL + customer?.image" alt="#"
            class="object-cover w-9 h-9 rounded-full border duration-500 cursor-zoom-out hover:object-scale-down" />
        </div>
        <div v-else>
          <UserIcon class="w-9 h-9 rounded-full border dark:border-gray-600 p-1.5 dark:text-gray-300" />
        </div>
        <span class="text-lg font-medium capitalize">
          {{ customer?.firstname + ' ' + customer?.lastname }}
        </span>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left dark:text-gray-300">{{ customer?.phone }}</td>
    <td v-motion-pop class="py-2 px-4 text-left dark:text-gray-300">{{ genderTranslate(customer?.gender) }}</td>
    <td v-motion-pop class="py-2 px-4 text-left dark:text-gray-300">
      {{ moment(customer?.createdAt).format('DD/MM/YYYY H:mm') }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex item-center justify-center">
        <div @click="openCustomerPage(customer)" class="w-4 mr-3 text-blue-500 hover:text-purple-500 transform hover:scale-110 cursor-pointer">
          <EyeIcon class="w-6 h-6" />
        </div>
        <div @click="openAddQrCodeModal(customer)" class="w-4 mr-3 transform hover:scale-110 cursor-pointer" :class="customer?.barcode ? 'text-blue-500 hover:text-purple-500' : 'text-red-500 hover:text-red-600'">
          <QrCodeIcon class="w-6 h-6" />
        </div>
        <div @click="addTariffWithPaymentModal(customer)" class="w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <MoneyIcon class="w-6 h-6" />
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
  <tr class="text-gray-700 text-md dark:text-gray-300">
    <td v-motion-pop colspan="10">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
