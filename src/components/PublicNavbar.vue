<script setup>
import SignInIcon from '../assets/icons/SignInIcon.vue'
import SelectOptionLanguages from '../components/Inputs/SelectOptionLanguages.vue'
</script>
<template>
    <header class="fixed top-0 w-full p-0 bg-white">
      <div class="container flex items-center py-2 mx-auto justify-between">
        <router-link to="/">
          <img src="/images/alpha-sport-urgench-logo.png" class="w-auto h-10" alt="Logo" />
        </router-link>
        <div class="flex items-start space-x-4">
          <SelectOptionLanguages />
          <router-link to="/login">
            <div class="flex items-center rounded-lg bg-gray-100 p-2 cursor-pointer hover:bg-gray-200 w-28 space-x-2">
              <SignInIcon class="w-6 h-6 text-gray-500" />
              <span>{{ $t('login') }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </header>
</template>
<style scoped></style>