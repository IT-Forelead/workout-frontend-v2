<script setup>
import { useModalStore } from '../store/modal.store'
import { useAuthStore } from '../store/auth.store'
import SunIcon from './Icons/SunIcon.vue'
import MoonIcon from './Icons/MoonIcon.vue'
import SettingsIcon from './Icons/SettingsIcon.vue'
import LogoutIcon from './Icons/LogoutIcon.vue'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const dropdown = ref(null)

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenProfileDropDown) {
    useModalStore().toggleProfile()
  }
})
</script>
<template>
  <div ref="dropdown" class="absolute top-14 w-full bg-white rounded-lg border border-gray-200 shadow-lg">
    <div class="border-b flex items-center py-2 px-3 space-x-3">
      <div class="w-10 block h-10 rounded-full bg-gray-700 shadow"></div>
      <div class="text-xs">
        <h1 class="font-bold">
          {{ useAuthStore().user?.firstname + ' ' + useAuthStore().user?.lastname }}
        </h1>
        <h1 class="text-gray-500">{{ useAuthStore().user?.phone }}</h1>
      </div>
    </div>
    <div class="px-3 py-2 hover:bg-gray-100">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-center text-sm">
          <SettingsIcon class="w-7 h-7 mr-3" />
          Settings
        </div>
      </div>
    </div>
    <div class="px-3 py-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-center text-sm">
          <SunIcon class="w-8 h-8 mr-3" />
          <!-- <MoonIcon class="w-7 h-7 mr-3"/> -->
          Light mode
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer">
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
          </div>
        </label>
      </div>
    </div>
    <div class="border-t py-2 px-3 space-x-3 cursor-pointer hover:bg-gray-100">
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm">
          <LogoutIcon class="w-7 h-7 mr-3" />
          Logout
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>