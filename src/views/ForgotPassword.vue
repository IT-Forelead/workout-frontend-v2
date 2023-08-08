<script setup>
import { ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { vMaska } from "maska"
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import CheckIcon from '../assets/icons/EnvelopeIcon.vue'
import PublicNavbar from '../components/PublicNavbar.vue'
import ShoucaseSection from '../components/ShoucaseSection.vue'
import AuthService from '../services/auth.service'
import { useSidebarStore } from '../store/sidebar.store.js'

const { t } = useI18n()
const lang = ref('')
const isLoading = ref(false)
const result = ref(false)
const phone = ref('')

const resetPassword = () => {
  if (!phone.value) {
    notify.warning({
      message: t('plsEnterYourPhone'),
    })
  } else if (phone.value.length !== 18) {
    notify.warning({
      message: t('plsEnterPhoneCorrectly'),
    })
  } else {
    isLoading.value = true
    AuthService.resetPassword(phone.value)
      .then((res) => {
        isLoading.value = false
        result.value = true
      })
      .catch((err) => {
        notify.warning({
          message: t('userNotFoundWithThisPhoneNumber'),
        })
        setTimeout(() => {
          isLoading.value = false
        }, 3000)
      })
  }
}

onMounted(() => {
  useSidebarStore().clearStore()
})
</script>

<template>
  <PublicNavbar />
  <div class="grid grid-cols-1 xl:grid-cols-3 w-full h-screen overflow-hidden">
    <div class="relative w-full xl:basis-1/3 max-h-screen p-4 md:p-8">
      <div v-if="result" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-2/3 px-8 md:px-4">
        <div class="flex flex-col items-center space-y-6">
          <div class="flex items-center justify-center w-24 h-24 bg-sky-50 rounded-lg">
            <CheckIcon class="w-16 h-16 text-blue-500"/>
          </div>
          <h1 class="text-2xl font-bold mb-5">{{ $t('smsWasSentTo') + phone }}</h1>
          <div class="text-gray-500">{{ $t('resetPasswordResult') }}</div>
          <router-link to="/" class="w-full select-none bg-gray-900 hover:bg-gray-800 cursor-pointer py-3 font-light text-white rounded flex items-center justify-center">
            {{ $t('backToHome') }}
          </router-link>
        </div>
      </div>
      <div v-else class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-2/3 px-8 md:px-4">
        <h1 class="text-2xl font-bold mb-5">{{ $t('resetPassword') }}</h1>
        <div class="flex flex-col space-y-6">
          <label for="phone">
            <p class="font-medium text-gray-700 pb-2">{{ $t('mobilePhone') }}</p>
            <input id="phone" v-maska data-maska="+998(##) ###-##-##" v-model="phone" type="text" class="w-full py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-500 hover:shadow" placeholder="+998(00) 000-00-00" />
          </label>
          <div class="text-gray-500">{{ $t('resetPasswordReference') }}</div>
          <div v-if="isLoading" class="w-full select-none bg-gray-600 py-3 font-light text-white rounded flex items-center justify-center">
            <svg class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span>{{ $t('loading') }}</span>
          </div>
          <div v-else @click="resetPassword()" class="w-full select-none bg-gray-900 hover:bg-gray-800 cursor-pointer py-3 font-light text-white rounded flex items-center justify-center">
            <span>{{ $t('send') }}</span>
          </div>
          <router-link to="/" class="text-center font-medium text-indigo-600 cursor-pointer hover:text-indigo-900">
            {{ $t('backToHome') }}
          </router-link>
        </div>
      </div>
      <div class="absolute bottom-0 left-1/2 py-4 -translate-x-1/2 text-xs text-[#5f697a] whitespace-nowrap">
        Developed and designed by 
        <a href="http://it-forelead.uz" target="_blank" class="cursor-pointer text-indigo-600 hover:text-indigo-900 font-medium">
          IT-Forelead
        </a>
      </div>
    </div>
    <div class="col-span-2 hidden  max-h-screen bg-gray-100 py-14 xl:block">
      <ShoucaseSection />
    </div>
  </div>
</template>

<style scoped></style>
