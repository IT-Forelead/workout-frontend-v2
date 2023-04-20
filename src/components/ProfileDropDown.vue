<script setup>
import { useModalStore } from '../store/modal.store'
import { useAuthStore } from '../store/auth.store'
import SunIcon from './Icons/SunIcon.vue'
import MoonIcon from './Icons/MoonIcon.vue'
import CaretDownIcon from './Icons/CaretDownIcon.vue'
import SettingsIcon from './Icons/SettingsIcon.vue'
import LogoutIcon from './Icons/LogoutIcon.vue'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import AuthService from '../services/auth.service'
import { useRouter } from 'vue-router'


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
    <div class="w-10 block h-10 rounded-lg bg-gray-700 shadow"></div>
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
        <span>Settings</span>
      </li>
      <!-- <li class="flex items-center hover:bg-gray-200 cursor-pointer p-2 space-x-2">
          <SunIcon class="w-6 h-6" />
          <div class="flex items-center justify-between">
            <div class="block">Light mode</div>
            <div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer">
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>
              </label>
            </div>
          </div>
        </li> -->
      <li @click="logout()" class="flex items-center hover:bg-gray-200 cursor-pointer p-2 space-x-2">
        <LogoutIcon class="w-6 h-6" />
        <span>Logout</span>
      </li>
    </ul>
  </div>
</template>
<style scoped></style>