<script setup>
import { useModalStore } from '../store/modal.store'
import { useAuthStore } from '../store/auth.store'
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'
import { onClickOutside, useDark } from '@vueuse/core'
import decodeJwt, { parseJwt } from '../mixins/utils'
import ChatTextIcon from './../assets/icons/ChatTextIcon.vue'
import BellIcon from './../assets/icons/BellIcon.vue'
import DarkModeIcon from '../assets/icons/DarkModeIcon.vue'
import LightModeIcon from '../assets/icons/LightModeIcon.vue'
import AddCustomerModal from './Modals/AddCustomerModal.vue'
import AddQrCodeModal from './Modals/AddQrCodeModal.vue'
import AddServiceModal from './Modals/AddServiceModal.vue'
import AddTrainerServiceModal from './Modals/AddTrainerServiceModal.vue'
import AddCustomerTariffModal from './Modals/AddCustomerTariffModal.vue'
import AddCustomerTrainerTariffModal from './Modals/AddCustomerTrainerTariffModal.vue'
import AddPaymentModal from './Modals/AddPaymentModal.vue'
import AddVisitModal from './Modals/AddVisitModal.vue'
import AddFakeVisitModal from './Modals/AddFakeVisitModal.vue'
import AddUserModal from './Modals/AddUserModal.vue'
import AddSoldProductModal from './Modals/AddSoldProductModal.vue'
import EditCustomerModal from './Modals/EditCustomerModal.vue'
import EditServiceModal from './Modals/EditServiceModal.vue'
import EditTrainerServiceModal from './Modals/EditTrainerServiceModal.vue'
import DeleteUserModal from './Modals/DeleteUserModal.vue'
import AddTariffWithPaymentModal from './Modals/AddTariffWithPaymentModal.vue'
import DeleteCustomerModal from './Modals/DeleteCustomerModal.vue'
import DeleteServiceModal from './Modals/DeleteServiceModal.vue'
import DeleteTrainerServiceModal from './Modals/DeleteTrainerServiceModal.vue'
import SelectOptionLanguages from './Inputs/SelectOptionLanguages.vue'
import ProfileDropDown from './ProfileDropDown.vue'
import AddProductModal from './Modals/AddProductModal.vue'
import AddProductHistoryModal from './Modals/AddProductHistoryModal.vue'
import EditProductModal from './Modals/EditProductModal.vue'
import DeleteProductModal from './Modals/DeleteProductModal.vue'

const { t } = useI18n()
const payload = ref({})

const notificationDropdown = ref(null)

onClickOutside(notificationDropdown, () => {
  if (useModalStore().isOpenNotification) {
    useModalStore().toggleNotification()
  }
})

onMounted(() => {
  useAuthStore().setUser(decodeJwt(JSON.parse(localStorage.getItem('session'))?.accessToken))
  payload.value = parseJwt()
})

const isDark = useDark()
</script>

<template>
  <div
    class="z-10 dark:border-b dark:border-b-gray-600 dark:border-l dark:border-l-gray-600 px-14 flex items-center justify-between h-16 py-4 text-black bg-white sticky-top dark:bg-gray-900 dark:text-gray-300 md:h-20">
    <div class="flex items-center justify-between space-x-10">
      <SelectOptionLanguages />
      <a href="https://t.me/trimuzsupport" target="_blank"
        class="flex items-center justify-between rounded-lg bg-gray-100 dark:bg-gray-800 p-2 px-4 space-x-2 cursor-pointer hover:bg-gray-200">
        <ChatTextIcon class="w-6 h-6 text-gray-500 dark:text-gray-300" />
        <span class="dark:text-gray-200">{{ $t('help') }}</span>
      </a>
      <button type="button" @click="isDark= !isDark"
              class="inline-flex items-center justify-center w-10 h-10 text-gray-500 dark:text-gray-300 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
        <DarkModeIcon v-if="!isDark"/>
        <LightModeIcon v-else/>
      </button>
    </div>
    <div class="flex items-center space-x-5">
      <div class="relative" ref="notificationDropdown">
        <div @click="useModalStore().toggleNotification()"
          class="flex items-center justify-between rounded-lg bg-gray-100 dark:bg-gray-800 p-2 px-4 space-x-2 cursor-pointer hover:bg-gray-200">
          <BellIcon class="w-6 h-6 text-gray-500 dark:text-gray-300" />
          <span class="dark:text-gray-300">{{ $t('notification') }}</span>
        </div>
        <div v-if="useModalStore().isOpenNotification"
          class="absolute dark:bg-gray-800 flex flex-col items-center justify-center bg-white w-80 h-40 shadow rounded-b-md p-3 z-20 top-14 right-0 space-y-2">
          <div class="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 shadow">
            <BellIcon class="w-10 h-10 text-gray-500 dark:text-gray-900" />
          </div>
          <div class="text-base dark:text-gray-300">{{ $t('noNotification') }}</div>
        </div>
      </div>
      <ProfileDropDown />
    </div>
  </div>

  <AddUserModal />
  <AddCustomerModal />
  <AddServiceModal />
  <AddTrainerServiceModal />
  <AddCustomerTariffModal />
  <AddCustomerTrainerTariffModal />
  <AddPaymentModal />
  <AddVisitModal />
  <AddFakeVisitModal />
  <AddQrCodeModal />
  <AddSoldProductModal />
  <EditCustomerModal />
  <EditServiceModal />
  <EditTrainerServiceModal />
  <DeleteUserModal />
  <DeleteCustomerModal />
  <DeleteServiceModal />
  <DeleteTrainerServiceModal />
  <AddTariffWithPaymentModal />
  <AddProductModal />
  <AddProductHistoryModal />
  <EditProductModal/>
  <DeleteProductModal/>
</template>

<style scoped></style>
