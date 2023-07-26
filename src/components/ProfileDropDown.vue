<script setup>
import { useModalStore } from '../store/modal.store'
import { useAuthStore } from '../store/auth.store'
import CaretDownIcon from './../assets/icons/CaretDownIcon.vue'
import SettingsIcon from './../assets/icons/SettingsIcon.vue'
import LogoutIcon from './../assets/icons/LogoutIcon.vue'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import AuthService from '../services/auth.service'
import { useRouter } from 'vue-router'
import UserIcon from './../assets/icons/UserIcon.vue'


const router = useRouter()
const dropdown = ref(null)

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenProfileDropDown) {
    useModalStore().toggleProfile()
  }
})

const logout = () => {
  AuthService.logout()
  router.push('/')
  if (useModalStore().isOpenProfileDropDown) {
    useModalStore().toggleProfile()
  }
}
</script>
<template>
  <div class="relative w-60" ref="dropdown">
    <div @click="useModalStore().toggleProfile()"
    class="flex items-center select-none justify-between relative cursor-pointer">
    <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 shadow">
      <UserIcon class="w-7 h-7 text-gray-500" />
    </div>
    <div class="text-sm text-left">
      <div class="font-bold">
        {{ useAuthStore().user?.firstname + ' ' + useAuthStore().user?.lastname }}
      </div>
      <div class="text-gray-500">{{ useAuthStore().user?.phone }}</div>
    </div>
    <div class="text-gray-600 bg-gray-100 rounded-full p-1 inline-flex items-center">
      <CaretDownIcon class="w-5 h-5" />
    </div>
  </div>
  <ul v-if="useModalStore().isOpenProfileDropDown"
      class="absolute w-full bg-white shadow rounded-b-md z-20 top-14 right-0 divide-y divide-gray-200">
      <li class="flex items-center hover:bg-gray-200 cursor-pointer p-2 space-x-2">
        <SettingsIcon class="w-6 h-6" />
        <span>{{ $t('settings') }}</span>
      </li>
      <li @click="logout()" class="flex items-center hover:bg-gray-200 cursor-pointer p-2 space-x-2">
        <LogoutIcon class="w-6 h-6" />
        <span>{{ $t('logout') }}</span>
      </li>
    </ul>
  </div>
</template>
<style scoped></style>