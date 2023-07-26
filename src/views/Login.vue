<script setup>
import { reactive, ref } from '@vue/reactivity';
import notify from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { vMaska } from "maska";
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import EyeIcon from '../assets/icons/EyeIcon.vue';
import EyeSlashIcon from '../assets/icons/EyeSlashIcon.vue';
import Spinners270RingIcon from '../assets/icons/Spinners270RingIcon.vue';
import SelectOptionLanguages from '../components/Inputs/SelectOptionLanguages.vue';
import decodeJwt from '../mixins/utils';
import AuthService from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';
import { useSidebarStore } from '../store/sidebar.store.js';

const { t } = useI18n()
const isLoading = ref(false)
const hidePassword = ref(true)
const router = useRouter()
const loginFormData = reactive({
  phone: '',
  password: '',
})
const togglePassword = () => (hidePassword.value = !hidePassword.value)

const login = () => {
  localStorage.removeItem('session')
  if (!loginFormData.phone || !loginFormData.password) {
    notify.warning({
      message: t('phoneOrPasswordIncorrect'),
    })
  } else {
    isLoading.value = true
    AuthService.login({
      phone: loginFormData.phone,
      password: loginFormData.password,
    })
      .then((res) => {
        if (res) {
          useAuthStore().setToken(res?.accessToken)
          useAuthStore().setUser(decodeJwt(res?.accessToken))
          isLoading.value = false
          if (localStorage.getItem('session')) {
            setTimeout(() => {
              router.push('/dashboard')
            }, 200)
          }
        }
      })
      .catch((err) => {
        notify.warning({
          message: t('phoneOrPasswordIncorrect'),
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
  <div class="grid grid-cols-1 xl:grid-cols-3 w-full h-screen overflow-hidden">
    <div class="relative w-full max-h-screen p-4 md:p-8">
      <div class="flex items-center justify-between">
        <img src="/images/alpha-sport-urgench-logo.png" class="p-2 border border-gray-300 rounded-lg w-auto h-16"
          alt="Logo" />
        <SelectOptionLanguages />
      </div>
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-2/3 px-8 md:px-4">
        <h1 class="text-2xl font-bold mb-5">{{ $t('login') }}</h1>
        <div class="flex flex-col space-y-6">
          <label for="phone">
            <p class="font-medium text-gray-500 pb-2">{{ $t('mobilePhone') }}</p>
            <input id="phone" v-maska data-maska="+998(##) ###-##-##" data-maska-tokens="998"
              v-model="loginFormData.phone" type="text"
              class="w-full py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="+998(00) 000-00-00" />
          </label>
          <div>
            <div class="flex flex-row items-center justify-between mb-2">
              <p class="font-medium text-gray-500">{{ $t('password') }}</p>
              <router-link to="/forgot-password" class="font-medium text-indigo-600 cursor-pointer hover:text-indigo-900">
                {{ $t('forgotPassword') }}
              </router-link>
            </div>
            <label for="password">
              <div class="relative">
                <input id="password" :type="hidePassword ? 'password' : 'text'" v-model="loginFormData.password"
                  class="w-full py-2 border border-gray-300 rounded px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  :placeholder="$t('enterYourPassword')" />
                <EyeIcon v-if="hidePassword" @click="togglePassword()"
                  class="text-gray-500 absolute z-10 top-1/2 -translate-y-1/2 right-3 w-5 h-5 cursor-pointer" />
                <EyeSlashIcon v-else @click="togglePassword()"
                  class="text-gray-500 absolute z-10 top-1/2 -translate-y-1/2 right-3 w-5 h-5 cursor-pointer" />
              </div>
            </label>
          </div>
          <div v-if="isLoading"
            class="w-full select-none bg-gray-600 py-3 font-light text-white rounded flex items-center justify-center">
            <Spinners270RingIcon
              class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
            <span>{{ $t('loading') }}</span>
          </div>
          <div v-else @click="login()"
            class="w-full select-none bg-gray-900 hover:bg-gray-800 cursor-pointer py-3 font-light text-white rounded flex items-center justify-center">
            <span>{{ $t('login') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-2 hidden  max-h-screen bg-gray-100 py-20 xl:flex flex-col justify-center space-y-10">
      <div class="flex justify-center">
        <div class="py-8 rounded-lg w-3/6 space-y-4">
          <div class="text-3xl text-center font-bold text-gray-900">{{ $t('workoutPlatform') }}</div>
          <div class="text-lg text-center text-gray-800">{{ $t('platformDescription') }}</div>
        </div>
      </div>
      <div class="space-y-2">
        <Vue3Marquee :pauseOnHover="true" :duration="200" :gradient="false" :direction="'normal'" class="overflow-hidden">
          <div class="flex ml-2 space-x-2">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-1.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-2.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-3.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-4.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-5.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-6.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-7.webp" alt="#">
          </div>
        </Vue3Marquee>
        <Vue3Marquee :pauseOnHover="true" :duration="250" :gradient="false" :direction="'reverse'"
          class="overflow-hidden">
          <div class="flex ml-2 space-x-2">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-8.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-9.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-10.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-11.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-12.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-13.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-14.webp" alt="#">
          </div>
        </Vue3Marquee>
        <Vue3Marquee :pauseOnHover="true" :duration="225" :gradient="false" :direction="'normal'" class="overflow-hidden">
          <div class="flex ml-2 space-x-2">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-15.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-16.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-17.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-18.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-19.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-20.webp" alt="#">
            <img class="rounded-xl h-44 w-auto" src="/images/workout/image-21.webp" alt="#">
          </div>
        </Vue3Marquee>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
