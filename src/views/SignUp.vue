<script setup>
import { reactive, ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { vMaska } from 'maska'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Spinners270RingIcon from '../assets/icons/Spinners270RingIcon.vue'
import RadioGender from '../components/Inputs/RadioGender.vue'
import PublicNavbar from '../components/PublicNavbar.vue'
import ShoucaseSection from '../components/ShoucaseSection.vue'
import { useSidebarStore } from '../store/sidebar.store'

const { t } = useI18n()
const isLoading = ref(false)
const router = useRouter()

const submitForm = reactive({
  image: null,
  firstname: '',
  lastname: '',
  phone: '',
  code: '',
  smsConfirmation: false,
})

const login = () => {
  if (!submitForm.firstname) {
    notify.warning({
      message: t('plsEnterYourFirstname'),
    })
  } else if (!submitForm.lastname) {
    notify.warning({
      message: t('plsEnterYourLastname'),
    })
  } else if (!submitForm.phone) {
    notify.warning({
      message: t('plsEnterYourPhone'),
    })
  } else {
    isLoading.value = true
    
  }
}

onMounted(() => {
  useSidebarStore().clearStore()
})
</script>

<template>
  <PublicNavbar />
  <div class="grid grid-cols-1 xl:grid-cols-3 w-full h-screen overflow-hidden dark:bg-gray-800">
    <div class="relative w-full max-h-screen p-4 md:p-8">
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-2/3 px-8 md:px-4">
        <h1 class="text-2xl font-bold mb-5 dark:text-white">{{ $t('signUp') }}</h1>
        <div class="flex flex-col space-y-6">
          <div>
            <label for="firstname" class="font-medium text-gray-500 pb-2 dark:text-white">{{ $t('firstname') }}</label>
            <input id="firstname" type="text" v-model="submitForm.firstname"
              class="w-full py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-500 hover:shadow"
              :placeholder="$t('enterYourFirstname')" />
          </div>
          <div>
            <label for="lastname" class="font-medium text-gray-500 pb-2 dark:text-white">{{ $t('lastname') }}</label>
            <input id="lastname" type="text" v-model="submitForm.lastname"
              class="w-full py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-500 hover:shadow"
              :placeholder="$t('enterYourLastname')" />
          </div>
          <div>
            <label for="phone" class="font-medium text-gray-500 pb-2 dark:text-white">{{ $t('mobilePhone') }}</label>
            <input id="phone" v-maska data-maska="+998(##) ###-##-##" data-maska-tokens="998"
              v-model="submitForm.phone" type="text"
              class="w-full py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="+998(00) 000-00-00" />
          </div>
          <div>
            <label class="font-medium text-gray-500 pb-2 dark:text-white">{{ $t('gender') }}</label>
            <RadioGender :gender="'male'" />
          </div>
          <div v-if="isLoading"
            class="w-full select-none bg-gray-600 py-3 font-light text-white rounded flex items-center justify-center">
            <Spinners270RingIcon
              class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
            <span>{{ $t('loading') }}</span>
          </div>
          <div v-else @click="login()"
            class="w-full select-none bg-gray-900 dark:bg-gray-700  dark:hover:bg-gray-900 hover:bg-gray-800 cursor-pointer py-3 font-light text-white rounded flex items-center justify-center">
            <span>{{ $t('signUp') }}</span>
          </div>
          <div class="text-center space-x-1">
            <span class="font-normal dark:text-white">
              {{ $t('haveAnAccountAlready') }}
            </span>
            <router-link to="/login" class="font-medium dark:text-indigo-500 dark:hover:text-indigo-600 text-indigo-600 cursor-pointer hover:text-indigo-900">
              {{ $t('login') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-1/2 dark:text-gray-300 py-4 -translate-x-1/2 text-xs text-[#5f697a] whitespace-nowrap">
        Developed and designed by 
        <a href="http://it-forelead.uz" target="_blank" class="dark:text-indigo-500 dark:hover:text-indigo-600 cursor-pointer text-indigo-600 hover:text-indigo-900 font-medium">
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
