<script setup>
import SignInIcon from '../assets/icons/SignInIcon.vue'
import SelectOptionLanguages from '../components/Inputs/SelectOptionLanguages.vue'
import { useDark } from '@vueuse/core'
import DarkModeIcon from '../assets/icons/DarkModeIcon.vue'
import LightModeIcon from '../assets/icons/LightModeIcon.vue'

const isDark = useDark()
</script>


<template>
    <header class="fixed top-0 w-full p-0 bg-white dark:bg-gray-900 dark:border-b dark:border-b-gray-600">
      <div class="container flex items-center py-2 mx-auto justify-between">
        <router-link to="/">
          <img src="/images/alpha-sport-urgench-logo.png" class="w-auto h-10" alt="Logo" />
        </router-link>
        <div class="flex items-start space-x-4">
          <button type="button" @click="isDark= !isDark"
                  class="inline-flex items-center justify-center w-10 h-10 text-gray-500 dark:text-gray-300 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
            <DarkModeIcon v-if="!isDark"/>
            <LightModeIcon v-else/>
          </button>
          <SelectOptionLanguages />
          <router-link to="/login">
            <div class="flex items-center rounded-lg bg-gray-100 p-2 cursor-pointer hover:bg-gray-200 w-28 space-x-2 dark:bg-gray-800">
              <SignInIcon class="w-6 h-6 text-gray-500 dark:text-gray-300" />
              <span class="dark:text-gray-300">{{ $t('login') }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </header>
</template>

<style scoped></style>