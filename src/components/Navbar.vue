<script setup>
import { useModalStore } from '../store/modal.store'
import { useAuthStore } from '../store/auth.store'
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import decodeJwt, { parseJwt } from '../mixins/utils'
import ChatTextIcon from './Icons/ChatTextIcon.vue'
import BellIcon from './Icons/BellIcon.vue'
import AddCustomerModal from './Modals/AddCustomerModal.vue'
import AddQrCodeModal from './Modals/AddQrCodeModal.vue'
import AddServiceModal from './Modals/AddServiceModal.vue'
import AddTrainerServiceModal from './Modals/AddTrainerServiceModal.vue'
import AddCustomerTariffModal from './Modals/AddCustomerTariffModal.vue'
import AddCustomerTrainerTariffModal from './Modals/AddCustomerTrainerTariffModal.vue'
import AddPaymentModal from './Modals/AddPaymentModal.vue'
import AddVisitModal from './Modals/AddVisitModal.vue'
import AddUserModal from './Modals/AddUserModal.vue'
import EditCustomerModal from './Modals/EditCustomerModal.vue'
import DeleteCustomerModal from './Modals/DeleteCustomerModal.vue'
import DeleteServiceModal from './Modals/DeleteServiceModal.vue'
import DeleteTrainerServiceModal from './Modals/DeleteTrainerServiceModal.vue'
import SelectOptionLanguages from './Inputs/SelectOptionLanguages.vue'
import ProfileDropDown from './ProfileDropDown.vue'

const { t } = useI18n()
const payload = ref({})

const notificationDropdown = ref(null)

onClickOutside(notificationDropdown, () => {
  if (useModalStore().isOpenNotification) {
    useModalStore().toggleNotification()
  }
})

onMounted(() => {
  useAuthStore().setUser(decodeJwt(localStorage.getItem('token')))
  payload.value = parseJwt()
})
</script>

<template>
  <div
    class="z-10 px-14 flex items-center justify-between h-16 py-4 text-black bg-white sticky-top dark:bg-gray-800 dark:text-gray-300 md:h-20">
    <div class="flex items-center justify-between space-x-10">
      <SelectOptionLanguages />
      <a href="https://t.me/trimuzsupport" target="_blank"
        class="flex items-center justify-between rounded-lg bg-gray-100 dark:bg-gray-700 p-2 px-4 space-x-2 cursor-pointer hover:bg-gray-200">
        <ChatTextIcon class="w-6 h-6 text-gray-500" />
        <span>{{ $t('help') }}</span>
      </a>
    </div>
    <div class="flex items-center space-x-5">
      <div class="relative" ref="notificationDropdown">
        <div @click="useModalStore().toggleNotification()"
          class="flex items-center justify-between rounded-lg bg-gray-100 dark:bg-gray-700 p-2 px-4 space-x-2 cursor-pointer hover:bg-gray-200">
          <BellIcon class="w-6 h-6 text-gray-500" />
          <span>{{ $t('notification') }}</span>
        </div>
        <div v-if="useModalStore().isOpenNotification"
          class="absolute flex flex-col items-center justify-center bg-white w-80 h-40 shadow rounded-b-md p-3 z-20 top-14 right-0 space-y-2">
          <div class="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 shadow">
            <BellIcon class="w-10 h-10 text-gray-500" />
          </div>
          <div class="text-base">{{ $t('noNotification') }}</div>
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
  <AddQrCodeModal />
  <EditCustomerModal />
  <DeleteCustomerModal />
  <DeleteServiceModal />
  <DeleteTrainerServiceModal />
</template>

<style scoped></style>
