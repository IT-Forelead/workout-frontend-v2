<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { vMaska } from 'maska'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ClockCountdownIcon from '../assets/icons/ClockCountdownIcon.vue'
import CheckCircleIcon from '../assets/icons/CheckCircleIcon.vue'
import Spinners270RingIcon from '../assets/icons/Spinners270RingIcon.vue'
import RadioGender from '../components/Inputs/RadioGender.vue'
import PublicNavbar from '../components/PublicNavbar.vue'
import ShoucaseSection from '../components/ShoucaseSection.vue'
import { useSidebarStore } from '../store/sidebar.store'
import { useDropdownStore } from '../store/dropdown.store'
import CustomerService from '../services/customer.service'

const { t } = useI18n()
const isLoading = ref(false)
const timer = ref('02:00')
const showResendSMS = ref(false)

const registerProcess = reactive({
  registerMode: true,
  checkingMode: false,
  congratulationMode: false,
})

const selectGender = computed(() => {
  return useDropdownStore().selectGenderOption
})

const handleOnComplete = (code) => {
  submitForm.code = code
  createCustomer()
}

const submitForm = reactive({
  image: null,
  firstname: '',
  lastname: '',
  phone: '',
  code: '',
  smsConfirmation: true,
})

var interval

function startTimer() {
  clearInterval(interval)
  interval = setInterval(function () {
    let time = localStorage.getItem('time')
    time = time.split(':')
    let minutes = time[0]
    let seconds = time[1]
    seconds -= 1
    if (minutes < 0) return
    else if (seconds < 0 && minutes !== 0) {
      minutes -= 1
      seconds = 59
    } else if (seconds < 10 && length.seconds !== 2) seconds = '0' + seconds

    timer.value = minutes + ':' + seconds
    localStorage.setItem('time', timer.value)

    if (minutes === 0 && seconds === 0) clearInterval(interval)
    if (localStorage.getItem('time') === '-1:59') {
      clearInterval(interval)
      showResendSMS.value = true
    }
  }, 1000)
}

const sendActivationCode = () => {
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
    registerProcess.registerMode = false
    registerProcess.checkingMode = true
    CustomerService.sendVerifyCode(submitForm.phone.replace(/([() -])/g, ''))
      .then(() => {
        isLoading.value = false
        notify.success({
          message: t('verificationCodeSentSuccessfully'),
        })
      })
      .catch(() => {
        notify.error({
          message: t('errorSendingVerificationCode'),
        })
        showResendSMS.value = true
      })
    localStorage.setItem('time', '02:00')
    startTimer()
    registerProcess.registerMode = false
    registerProcess.checkingMode = true
    showResendSMS.value = false
  }
}

const createCustomer = () => {
  isLoading.value = true
  const formData = new FormData()
  formData.append('firstname', submitForm.firstname)
  formData.append('lastname', submitForm.lastname)
  formData.append('gender', selectGender.value?.id)
  if (submitForm.image) formData.append('image', submitForm.image)
  formData.append('phone', submitForm.phone.replace(/([() -])/g, ''))
  formData.append('smsConfirmation', submitForm.smsConfirmation)
  formData.append('code', submitForm.code)
  CustomerService.create(formData)
    .then(() => {
      registerProcess.registerMode = false
      registerProcess.checkingMode = false
      registerProcess.congratulationMode = true
      clearInterval(interval)
      notify.success({
        message: t('customerCreated'),
      })
      isLoading.value = false
    })
    .catch((err) => {
      notify.error({
        message: t('errorCreatingCustomer'),
      })
      isLoading.value = false
    })
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
        <!-- Step 1 -->
        <div v-if="registerProcess.registerMode" class="flex flex-col space-y-6">
          <div>
            <label for="firstname" class="font-medium text-gray-500 pb-2 dark:text-white">{{ $t('firstname') }}</label>
            <input id="firstname" type="text" v-model="submitForm.firstname"
              class="w-full py-2 border border-gray-300 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 rounded focus:outline-none focus:border-slate-500 hover:shadow"
              :placeholder="$t('enterYourFirstname')" />
          </div>
          <div>
            <label for="lastname" class="font-medium text-gray-500 pb-2 dark:text-white">{{ $t('lastname') }}</label>
            <input id="lastname" type="text" v-model="submitForm.lastname"
              class="w-full py-2 border border-gray-300 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 rounded focus:outline-none focus:border-slate-500 hover:shadow"
              :placeholder="$t('enterYourLastname')" />
          </div>
          <div>
            <label for="phone" class="font-medium text-gray-500 pb-2 dark:text-white">{{ $t('mobilePhone') }}</label>
            <input id="phone" v-maska data-maska="+998(##) ###-##-##" data-maska-tokens="998" v-model="submitForm.phone"
              type="text"
              class="w-full py-2 border border-gray-300 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 rounded focus:outline-none focus:border-slate-500 hover:shadow"
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
          <div v-else @click="sendActivationCode()"
            class="w-full select-none bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer py-3 font-light text-white rounded flex items-center justify-center">
            <span>{{ $t('signUp') }}</span>
          </div>
          <div class="text-center space-x-1">
            <span class="font-normal dark:text-white">
              {{ $t('haveAnAccountAlready') }}
            </span>
            <router-link to="/login" class="font-medium text-indigo-600 cursor-pointer hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-600">
              {{ $t('login') }}
            </router-link>
          </div>
        </div>
        <!-- Step 2 -->
        <div v-if="registerProcess.checkingMode" class="flex flex-col space-y-6">
          <div class="px-3 text-xl text-center text-gray-600 dark:text-gray-300">
            {{ $t('verificationCodeHasBeenSentToTheNumberBelow') }}
            <strong class="text-black dark:text-gray-300 ml-2">{{ submitForm.phone }}</strong>
          </div>
          <div class="flex justify-center my-5">
            <v-otp-input ref="otpInput"
              input-classes="otp-input dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 mx-2 w-9 border-gray-300 rounded text-center p-0 py-1.5 text-xl"
              separator=" " :num-inputs="4" :should-auto-focus="true" :is-input-num="true"
              :conditionalClass="['one', 'two', 'three', 'four']" :placeholder="['', '', '', '']"
              @on-complete="handleOnComplete" />
          </div>
          <div v-if="showResendSMS" @click="sendActivationCode()"
            class="flex justify-center my-3 text-lg text-red-500 cursor-pointer hover:underline">
            {{ $t('didNotreceiveSms') }}
          </div>
          <div v-else-if="!isLoading" class="flex items-center justify-center my-3 text-xl text-red-600 space-x-2">
            <ClockCountdownIcon class="w-6 h-6" />
            <span>{{ timer }}</span>
          </div>
          <div v-else class="flex items-center justify-center my-3 text-xl text-red-600 space-x-2">
            <Spinners270RingIcon
              class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
          </div>
        </div>
        <!-- Step 3 -->
        <div v-if="registerProcess.congratulationMode" class="flex flex-col justify-center">
          <CheckCircleIcon class="mx-auto text-green-500 text-9xl" />
          <p class="my-5 text-xl text-center text-green-500">
            {{ $t('youHaveSuccessfullyRegistered') }}
          </p>
          <router-link to="/login" class="font-medium text-indigo-600 cursor-pointer hover:text-indigo-900">
            <div
              class="w-full select-none bg-gray-900 hover:bg-gray-800 cursor-pointer py-3 font-light text-white rounded flex items-center justify-center">
              <span>{{ $t('login') }}</span>
            </div>
          </router-link>
        </div>
      </div>
      <div class="absolute bottom-0 left-1/2 py-4 -translate-x-1/2 text-xs text-[#5f697a] whitespace-nowrap dark:text-gray-300">
        Developed and designed by
        <a href="http://it-forelead.uz" target="_blank"
          class="dark:text-indigo-500 dark:hover:text-indigo-600 cursor-pointer text-indigo-600 hover:text-indigo-900 font-medium">
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
