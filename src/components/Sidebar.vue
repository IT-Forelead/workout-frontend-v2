<script setup>
import HouseIcon from './Icons/HouseIcon.vue'
import UserListIcon from './Icons/UserListIcon.vue';
</script>

<template>
  <div class="fixed block h-screen bg-gray-900 text-white w-80">
    <div class="bg-gray-800 h-20 flex items-center justify-center">
      <img src="/images/alpha-sport-logo.png" class="h-14 w-auto" alt="#" />
    </div>
    <ul class="relative space-y-1 py-14">
      <router-link to="/dashboard"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center text-white space-x-5">
          <HouseIcon class="w-7 h-7 text-gray-400" />
          <p>{{ $t('mainPage') }}</p>
        </div>
      </router-link>
      <router-link to="/tariffs"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center text-white space-x-5">
          <UserListIcon class="w-7 h-7 text-gray-400" />
          <p>Customer tariffs</p>
        </div>
      </router-link>
      <router-link to="/customers"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center text-white space-x-5">
          <UserListIcon class="w-7 h-7 text-gray-400" />
          <p>Customers</p>
        </div>
      </router-link>
      <router-link to="/users"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center text-white space-x-5">
          <UserListIcon class="w-7 h-7 text-gray-400" />
          <p>{{ $t('users') }}</p>
        </div>
      </router-link>
      <router-link to="/services"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center text-white space-x-5">
          <UserListIcon class="w-7 h-7 text-gray-400" />
          <p>{{ $t('services') }}</p>
        </div>
      </router-link>
      <router-link to="/trainer-services"
        class="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
        <div class="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
        <div class="px-10 flex items-center text-white space-x-5">
          <UserListIcon class="w-7 h-7 text-gray-400" />
          <p>{{ $t('trainerServices') }}</p>
        </div>
      </router-link>
    </ul>
    <div class="absolute bottom-0 w-full mb-3 text-sm text-center text-gray-400 dark:text-gray-400">
      Copyright &copy; 2023 <a href="http://it-forelead.uz" class="hover:underline">IT-Forelead</a>. <br />
      All Rights Reserved.
    </div>
  </div>
</template>
