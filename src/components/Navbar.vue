<script setup>
import { useAuthStore } from '../store/auth.store'
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'
import decodeJwt, { parseJwt } from '../mixins/utils'
import CaretDownIcon from './Icons/CaretDownIcon.vue'
import GlobeEastIcon from './Icons/GlobeEastIcon.vue'
import ChatTextIcon from './Icons/ChatTextIcon.vue'
import BellIcon from './Icons/BellIcon.vue'
import AddCustomerModal from './Modals/AddCustomerModal.vue'

const { t } = useI18n()
const currentLang = ref('')
const payload = ref({})

onMounted(() => {
  currentLang.value = localStorage.getItem('lang') || 'uz'
  document.getElementsByTagName('title')[0].innerHTML = t('title')
  useAuthStore().setUser(decodeJwt(localStorage.getItem('token')))
  payload.value = parseJwt()
})
</script>

<template>
  <div
    class="z-10 px-14 flex items-center justify-between h-16 py-4 text-black bg-white sticky-top dark:bg-gray-800 dark:text-gray-300 md:h-20">
    <div class="flex items-center justify-between space-x-10">
      <div
        class="flex items-center justify-between rounded-xl bg-gray-100 dark:bg-gray-700 p-2 px-4 space-x-2 cursor-pointer hover:bg-gray-200">
        <GlobeEastIcon class="w-6 h-6 text-gray-500" />
        <h1>English</h1>
        <CaretDownIcon class="w-5 h-5" />
      </div>
      <div
        class="flex items-center justify-between rounded-xl bg-gray-100 dark:bg-gray-700 p-2 px-4 space-x-2 cursor-pointer hover:bg-gray-200">
        <ChatTextIcon class="w-6 h-6 text-gray-500" />
        <h1>Help</h1>
        <CaretDownIcon class="w-5 h-5" />
      </div>
    </div>
    <div class="flex items-center space-x-5">
      <div
        class="flex items-center justify-between rounded-xl bg-gray-100 dark:bg-gray-700 p-2 px-4 space-x-2 cursor-pointer hover:bg-gray-200">
        <BellIcon class="w-6 h-6 text-gray-500" />
        <h1>Notification</h1>
      </div>
      <div class="flex items-center justify-between space-x-5">
        <div class="text-sm text-right">
          <h1 class="font-bold">
            {{ useAuthStore().user?.firstname + ' ' + useAuthStore().user?.lastname }}
          </h1>
          <h1 class="text-gray-500">{{ useAuthStore().user?.phone }}</h1>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-10 block h-10 rounded-full bg-gray-700 shadow"></div>
          <CaretDownIcon class="w-5 h-5" />
        </div>
      </div>
    </div>
  </div>
  <AddCustomerModal/>
</template>

<style scoped></style>
