<script setup>
import { computed, onMounted } from '@vue/runtime-core';
import { ref } from 'vue';
import decodeJwt, { parseJwt } from '../mixins/utils';
import { useAuthStore } from '../store/auth.store';
import { useSidebarStore } from '../store/sidebar.store';
import EnvelopeIcon from './Icons/EnvelopeIcon.vue';
import FolderOpenIcon from './Icons/FolderOpenIcon.vue';
import FolderUserIcon from './Icons/FolderUserIcon.vue';
import HouseIcon from './Icons/HouseIcon.vue';
import MoneyIcon from './Icons/MoneyIcon.vue';
import UserListIcon from './Icons/UserListIcon.vue';
import UsersThreeIcon from './Icons/UsersThreeIcon.vue';
import ChevronRightIcon from './Icons/ChevronRightIcon.vue';

const payload = ref({})

const isOpen = computed(() => useSidebarStore().isOpenSidebar)
const isOpenSubMenuForTariffs = computed(() => useSidebarStore().isOpenSubMenuForTariffs)
const isOpenSubMenuForServices = computed(() => useSidebarStore().isOpenSubMenuForServices)

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

onMounted(() => {
  useAuthStore().setUser(decodeJwt(localStorage.getItem('token')))
  payload.value = parseJwt()
})
</script>

<template>
  <div class="fixed block h-screen bg-gray-900 w-80 text-gray-400">
    <div class="bg-gray-600 h-20 flex items-center justify-center">
      <img src="/images/alpha-sport-urgench-logo.png" class="h-14 w-auto" alt="#" />
    </div>
    <div class="relative space-y-1 py-14">
      <router-link to="/dashboard" active-class="active"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 px-6 space-x-4 cursor-pointer transition-colors duration-300">
        <div class="flex items-center justify-center rounded-xl w-10 h-10">
          <HouseIcon class="w-6 h-6" />
        </div>
        <div>{{ $t('mainPage') }}</div>
      </router-link>
      <div @click="useSidebarStore().toggleSubMenuForTariffs()" active-class="active"
        class="relative flex items-center justify-between h-10 w-full hover:bg-yellow-500/10 py-7 px-6 cursor-pointer transition-colors duration-300">
        <div class="flex items-center space-x-4">
          <div class="flex items-center justify-center rounded-xl w-10 h-10">
            <FolderUserIcon class="w-6 h-6" />
          </div>
          <div>{{ $t('tariffs') }}</div>
        </div>
        <ChevronRightIcon class="w-5 h-5 transition-all duration-300" :class="{ 'rotate-90': isOpenSubMenuForTariffs }" />
      </div>
      <div :class="{ hidden: !isOpenSubMenuForTariffs }" class="transition-all duration-300">
        <router-link to="/tariffs" active-class="text-yellow-400"
          class="flex items-center justify-between hover:bg-yellow-500/10 p-3 rounded-lg cursor-pointer pl-14">
          <div class="flex items-center space-x-2">
            <p>-</p>
            <p>{{ $t('customerTariff') }}</p>
          </div>
        </router-link>
        <router-link to="/trainer-tariffs" active-class="text-yellow-400"
          class="flex items-center justify-between hover:bg-yellow-500/10 p-3 rounded-lg cursor-pointer pl-14">
          <div class="flex items-center space-x-2">
            <p>-</p>
            <p>{{ $t('trainerTariffs') }}</p>
          </div>
        </router-link>
      </div>
      <router-link to="/payments" active-class="active"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 px-6 space-x-4 cursor-pointer transition-colors duration-300">
        <div class="flex items-center justify-center rounded-xl w-10 h-10">
          <MoneyIcon class="w-6 h-6" />
        </div>
        <div>{{ $t('payments') }}</div>
      </router-link>
      <router-link to="/customers" active-class="active"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 px-6 space-x-4 cursor-pointer transition-colors duration-300">
        <div class="flex items-center justify-center rounded-xl w-10 h-10">
          <UsersThreeIcon class="w-6 h-6" />
        </div>
        <div>{{ $t('customers') }}</div>
      </router-link>
      <div @click="useSidebarStore().toggleSubMenuForServices()" active-class="active"
        class="relative flex items-center justify-between h-10 w-full hover:bg-yellow-500/10 py-7 px-6 space-x-4 cursor-pointer transition-colors duration-300">
        <div class="flex items-center space-x-4">
          <div class="flex items-center justify-center rounded-xl w-10 h-10">
            <FolderOpenIcon class="w-6 h-6" />
          </div>
          <div>{{ $t('services') }}</div>
        </div>
        <ChevronRightIcon class="w-5 h-5 transition-all duration-300" :class="{ 'rotate-90': isOpenSubMenuForServices }" />
      </div>
      <div :class="{ hidden: !isOpenSubMenuForServices }" class="transition-all duration-300">
        <router-link to="/services" active-class="text-yellow-400"
          class="flex items-center justify-between hover:bg-yellow-500/10 p-3 rounded-lg cursor-pointer pl-14">
          <div class="flex items-center space-x-2">
            <p>-</p>
            <p>{{ $t('services') }}</p>
          </div>
        </router-link>
        <router-link to="/trainer-services" active-class="text-yellow-400"
          class="flex items-center justify-between hover:bg-yellow-500/10 p-3 rounded-lg cursor-pointer pl-14">
          <div class="flex items-center space-x-2">
            <p>-</p>
            <p>{{ $t('trainerServices') }}</p>
          </div>
        </router-link>
      </div>
      <router-link to="/users" active-class="active"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 px-6 space-x-4 cursor-pointer transition-colors duration-300">
        <div class="flex items-center justify-center rounded-xl w-10 h-10">
          <UserListIcon class="w-6 h-6" />
        </div>
        <div>{{ $t('users') }}</div>
      </router-link>
      <router-link to="/sms-messages" v-if="navigationGuard(['super_manager'])" active-class="active"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 px-6 space-x-4 cursor-pointer transition-colors duration-300">
        <div class="flex items-center justify-center rounded-xl w-10 h-10">
          <EnvelopeIcon class="w-6 h-6" />
        </div>
        <div>{{ $t('smsMessages') }}</div>
      </router-link>
    </div>
    <div class="absolute bottom-0 w-full mb-3 text-sm text-center dark:text-gray-400">
      Copyright &copy; {{ new Date().getFullYear() }} <a href="http://it-forelead.uz"
        class="hover:underline">IT-Forelead</a>. <br />
      All Rights Reserved.
    </div>
  </div>
</template>
