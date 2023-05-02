<script setup>
import FolderUserIcon from './Icons/FolderUserIcon.vue';
import UsersThreeIcon from './Icons/UsersThreeIcon.vue';
import FolderOpenIcon from './Icons/FolderOpenIcon.vue';
import HouseIcon from './Icons/HouseIcon.vue'
import UserListIcon from './Icons/UserListIcon.vue';
import MoneyIcon from './Icons/MoneyIcon.vue';
import EnvelopeIcon from './Icons/EnvelopeIcon.vue';
</script>

<template>
  <div class="fixed block h-screen bg-gray-900 w-80 text-gray-400">
    <div class="bg-gray-600 h-20 flex items-center justify-center">
      <img src="/images/alpha-sport-urgench-logo.png" class="h-14 w-auto" alt="#" />
    </div>
    <ul class="relative space-y-1 py-14">
      <router-link to="/dashboard" active-class="active"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center space-x-5">
          <HouseIcon class="w-7 h-7" />
          <p>{{ $t('mainPage') }}</p>
        </div>
      </router-link>
      <router-link to="/tariffs" active-class="active"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center space-x-5">
          <FolderUserIcon class="w-7 h-7" />
          <p>{{ $t('tariffs') }}</p>
        </div>
      </router-link>
      <router-link to="/trainer-tariffs" active-class="active"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center space-x-5">
          <FolderUserIcon class="w-7 h-7" />
          <p>{{ $t('trainerTariffs') }}</p>
        </div>
      </router-link>
      <router-link to="/payments" active-class="active"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center space-x-5">
          <MoneyIcon class="w-7 h-7" />
          <p>{{ $t('payments') }}</p>
        </div>
      </router-link>
      <router-link to="/customers" active-class="active"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center space-x-5">
          <UsersThreeIcon class="w-7 h-7" />
          <p>{{ $t('customers') }}</p>
        </div>
      </router-link>
      <router-link to="/services" active-class="active"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center space-x-5">
          <FolderOpenIcon class="w-7 h-7" />
          <p>{{ $t('services') }}</p>
        </div>
      </router-link>
      <router-link to="/trainer-services" active-class="active"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center space-x-5">
          <FolderOpenIcon class="w-7 h-7" />
          <p>{{ $t('trainerServices') }}</p>
        </div>
      </router-link>
      <router-link to="/users" active-class="active"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center space-x-5">
          <UserListIcon class="w-7 h-7" />
          <p>{{ $t('users') }}</p>
        </div>
      </router-link>
      <router-link to="/sms-messages" active-class="active"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center space-x-5">
          <EnvelopeIcon class="w-7 h-7" />
          <p>{{ $t('smsMessages') }}</p>
        </div>
      </router-link>
    </ul>
    <div class="absolute bottom-0 w-full mb-3 text-sm text-center dark:text-gray-400">
      Copyright &copy; {{ new Date().getFullYear() }} <a href="http://it-forelead.uz" class="hover:underline">IT-Forelead</a>. <br />
      All Rights Reserved.
    </div>
  </div>
</template>
