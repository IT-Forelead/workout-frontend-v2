<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { vMaska } from "maska"
import { useI18n } from 'vue-i18n'
import CustomerService from '../../services/customer.service'
import { useCustomerStore } from '../../store/customer.store'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import CheckCircleIcon from '../../assets/icons/CheckCircleIcon.vue'
import CheckIcon from '../../assets/icons/CheckIcon.vue'
import ClockCountdownIcon from '../../assets/icons/ClockCountdownIcon.vue'
import ImageIcon from '../../assets/icons/ImageIcon.vue'
import XIcon from '../../assets/icons/XIcon.vue'
import RadioGender from '../Inputs/RadioGender.vue'
import Spinners270RingIcon from '../../assets/icons/Spinners270RingIcon.vue'

const { t } = useI18n()

const timer = ref('02:00')
const showResendSMS = ref(false)

const selectGender = computed(() => {
  return useDropdownStore().selectGenderOption
})

const handleOnComplete = (code) => {
  submitForm.code = code
  createCustomer()
}

const registerProcess = reactive({
  registerMode: true,
  checkingMode: false,
  congratulationMode: false,
})

const submitForm = reactive({
  image: null,
  firstname: '',
  lastname: '',
  phone: '',
  code: '',
  smsConfirmation: false,
})

const selectedImage = ref('')

function getImage(e) {
  if (e.target.files[0].type.includes('image')) {
    submitForm.image = e.target.files[0]
    selectedImage.value = URL.createObjectURL(submitForm.image)
  } else {
    notify.warning({
      message: t('onlyImageCanBeUploaded'),
    })
  }
}

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

const clearForm = () => {
  submitForm.image = null
  submitForm.firstname = ''
  submitForm.lastname = ''
  submitForm.phone = ''
  submitForm.code = ''
  submitForm.smsConfirmation = false
}

const closeModal = () => {
  useModalStore().closeAddCustomerModal()
  registerProcess.registerMode = true
  registerProcess.checkingMode = false
  registerProcess.congratulationMode = false
  clearForm()
}

const sendActivationCode = () => {
  if (!submitForm.firstname) {
    notify.warning({
      message: t('plsEnterFirstname'),
    })
  } else if (!submitForm.lastname) {
    notify.warning({
      message: t('plsEnterLastname'),
    })
  } else if (!submitForm.phone) {
    notify.warning({
      message: t('plsEnterPhone'),
    })
  }
  else if (submitForm.phone.length < 18) {
    notify.warning({
      message: t('plsEnterPhoneCorrectly'),
    })
  } else if (!selectGender.value?.id) {
    notify.warning({
      message: t('plsSelectGender'),
    })
  } else if (submitForm.smsConfirmation) {
    CustomerService.sendActivationCode(submitForm.phone.replace(/([() -])/g, ''))
      .then(() => {
        localStorage.setItem('time', '02:00')
        startTimer()
        registerProcess.registerMode = false
        registerProcess.checkingMode = true
        notify.success({
          message: t('verificationCodeSentSuccessfully'),
        })
      })
      .catch((err) => {
        if (err.response.data.includes('Phone in use:')) {
          notify.error({
            message: err.response.data.substring(14, 27) + t('thisNumberHasCustomer'),
          })
        } else {
          notify.error({
            message: t('errorCreatingCustomer'),
          })
        }
        showResendSMS.value = true
      })
    showResendSMS.value = false
  } else createCustomer()
}

const isLoading = ref(false)

const createCustomer = () => {
  isLoading.value = true
  const formData = new FormData()
  formData.append('firstname', submitForm.firstname)
  formData.append('lastname', submitForm.lastname)
  formData.append('gender', selectGender.value?.id)
  if (submitForm.image) formData.append('image', submitForm.image)
  formData.append('phone', submitForm.phone.replace(/([() -])/g, ''))
  formData.append('smsConfirmation', submitForm.smsConfirmation)
  formData.append('code', submitForm.smsConfirmation ? submitForm.code : '7777')
  CustomerService.createCustomer(formData)
    .then(() => {
      registerProcess.registerMode = false
      registerProcess.checkingMode = false
      registerProcess.congratulationMode = true
      clearInterval(interval)
      notify.success({
        message: t('customerCreated'),
      })
      isLoading.value = false
      CustomerService.getCustomers({})
        .then((res) => {
          useCustomerStore().clearStore()
          setTimeout(() => {
            useCustomerStore().setCustomers(res?.data)
          }, 500)
        })
        .catch((err) => {
          notify.error({
            message: t('errorGettingCustomers'),
          })
        })
    })
    .catch((err) => {
      if (err.response.data.includes('Phone in use:')) {
        notify.error({
          message: err.response.data.substring(14, 27) + t('thisNumberHasCustomer'),
        })
      } else {
        notify.error({
          message: t('errorCreatingCustomer'),
        })
      }
      isLoading.value = false
    })
}

const skipConfirmation = () => {
  submitForm.smsConfirmation = false
  createCustomer()
}
</script>
<template>
  <div v-if="useModalStore().isAddCustomerModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-4xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('addCustomer') }}</div>
          <button @click="closeModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="p-5">
          <div
            class="flex p-3 mb-3 border border-gray-300 rounded-lg justify-evenly dark:border-gray-600 md:grid md:grid-cols-3">
            <!-- Step 1 -->
            <div class="flex items-center justify-between">
              <!-- in progress -->
              <div v-if="registerProcess.registerMode" class="flex items-center justify-between">
                <div
                  class="flex items-center justify-center w-10 h-10 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-full text-md">
                  01
                </div>
                <div class="ml-3 font-semibold text-blue-500 text-md">
                  {{ $t('customerData') }}
                </div>
              </div>
              <!-- completed -->
              <div v-else class="flex items-center justify-between space-x-3">
                <div class="flex items-center justify-center w-10 h-10 text-white bg-blue-500 rounded-full">
                  <CheckIcon class="w-6 h-6" />
                </div>
                <div class="font-semibold text-gray-700 text-md">
                  {{ $t('customerData') }}
                </div>
              </div>
              <div class="relative mt-1 ml-7 md:-left-8 md:ml-0">
                <div class="absolute bottom-0 border-r border-gray-300 rounded-lg -rotate-[25deg] h-9"></div>
                <div class="absolute border-r border-gray-300 rounded-lg rotate-[25deg] -top-1 h-9"></div>
              </div>
            </div>
            <!-- Step 2 -->
            <div class="flex items-center justify-between">
              <!-- default -->
              <div v-if="registerProcess.registerMode" class="flex items-center">
                <div
                  class="flex items-center justify-center w-10 h-10 font-semibold text-gray-500 bg-white border-2 border-gray-300 rounded-full text-md">
                  02
                </div>
                <div class="hidden ml-3 font-semibold text-gray-500 text-md md:block">
                  {{ $t('confirmation') }}
                </div>
              </div>
              <!-- in progress -->
              <div v-else-if="registerProcess.checkingMode" class="flex items-center justify-between">
                <div
                  class="flex items-center justify-center w-10 h-10 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-full text-md">
                  02
                </div>
                <div class="hidden ml-3 font-semibold text-blue-500 text-md md:block">
                  {{ $t('confirmation') }}
                </div>
              </div>
              <!-- completed -->
              <div v-else-if="registerProcess.congratulationMode" class="flex items-center justify-between space-x-3">
                <div class="flex items-center justify-center w-10 h-10 text-2xl text-white bg-blue-500 rounded-full">
                  <CheckIcon class="w-6 h-6" />
                </div>
                <div class="font-semibold text-gray-700 text-md">
                  {{ $t('confirmation') }}
                </div>
              </div>
              <div class="relative mt-1 ml-7 md:-left-8 md:ml-0">
                <div class="absolute bottom-0 border-r border-gray-300 rounded-lg -rotate-[25deg] h-9"></div>
                <div class="absolute border-r border-gray-300 rounded-lg rotate-[25deg] -top-1 h-9"></div>
              </div>
            </div>
            <!-- Step 3 -->
            <div class="flex items-center">
              <!-- in progress -->
              <div v-if="registerProcess.congratulationMode" class="flex items-center justify-between">
                <div
                  class="flex items-center justify-center w-10 h-10 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-full text-md">
                  03
                </div>
                <div class="hidden ml-3 font-semibold text-blue-500 text-md md:block">
                  {{ $t('finish') }}
                </div>
              </div>
              <!-- default -->
              <div v-else class="flex items-center">
                <div
                  class="flex items-center justify-center w-10 h-10 font-semibold text-gray-500 bg-white border-2 border-gray-300 rounded-full text-md">
                  03
                </div>
                <div class="hidden ml-3 font-semibold text-gray-500 text-md md:block">
                  {{ $t('finish') }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <form @submit.prevent="createCustomer()" method="post" enctype="multipart/form-data">
          <!-- Step 1 -->
          <div v-if="registerProcess.registerMode" class="grid gap-5 grid-cols-2 p-5">
            <div class="flex flex-col col-span-2 mb-10">
              <label v-if="!submitForm.image" for="dropzone-file"
                class="relative flex items-center justify-center w-24 h-24 max-w-lg p-6 mx-auto text-center border-2 border-blue-400 border-dashed rounded-full cursor-pointer bg-slate-100 dark:bg-gray-700">
                <ImageIcon class="w-16 h-16 text-blue-500" />
                <input id="dropzone-file" type="file" class="hidden" name="image" @change="getImage" />
                <div
                  class="absolute mx-auto mt-3 text-lg font-semibold tracking-wide text-blue-500 -bottom-10 whitespace-nowrap">
                  {{ $t('uploadPhoto') }}
                </div>
              </label>
              <label v-else for="dropzone-file"
                class="relative flex items-center justify-center w-24 h-24 max-w-lg mx-auto text-center border-2 rounded-full cursor-pointer">
                <img :src="selectedImage" class="object-cover w-24 h-24 rounded-full" alt="#" />
                <input id="dropzone-file" type="file" class="hidden" name="image" @change="getImage" />
                <div
                  class="absolute mx-auto mt-3 text-lg font-semibold tracking-wide text-blue-500 -bottom-10 whitespace-nowrap">
                  {{ $t('uploadPhoto') }}
                </div>
              </label>
            </div>
            <div>
              <label for="lastname">{{ $t('lastname') }}</label>
              <input v-model="submitForm.lastname" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg"
                type="text" id="lastname" :placeholder="$t('enterLastname')" />
            </div>
            <div>
              <label for="firstname">{{ $t('firstname') }}</label>
              <input v-model="submitForm.firstname"
                class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg" type="text" id="firstname"
                :placeholder="$t('enterFirstname')" />
            </div>
            <div>
              <label for="phone">{{ $t('phone') }}</label>
              <input v-model="submitForm.phone" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg"
                type="text" v-maska data-maska="+998(##) ###-##-##" placeholder="+998(00) 000-00-00" />
            </div>
            <div>
              <label>{{ $t('gender') }}</label>
              <RadioGender :gender="'male'" />
            </div>
          </div>
          <!-- Step 2 -->
          <div v-if="registerProcess.checkingMode" class="flex justify-center">
            <div class="flex flex-col">
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
                <button class="w-16 pl-2 py-2 rounded-md text-white text-base bg-blue-500 select-none">
                  <div class="flex items-center justify-center">
                    <Spinners270RingIcon
                      class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
                    <span></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </form>
        <!-- Step 3 -->
        <div v-if="registerProcess.congratulationMode" class="flex justify-center">
          <div class="flex flex-col">
            <CheckCircleIcon class="mx-auto text-green-500 text-9xl" />
            <p class="my-5 text-xl text-center text-green-500">
              {{ $t('customerCreated') }}
            </p>
          </div>
        </div>
        <div class="flex items-center justify-between p-4 border-t dark:border-gray-600">
          <div v-if="registerProcess.registerMode" class="flex items-start">
            <div class="flex items-center h-6">
              <input v-model="submitForm.smsConfirmation" id="sms-confirmation" type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600">
            </div>
            <div class="ml-3 text-sm leading-6">
              <label for="sms-confirmation" class="font-medium text-gray-900 dark:text-gray-300">
                {{ $t('smsVerification') }}
              </label>
            </div>
          </div>
          <div v-else></div>
          <div class="space-x-2">
            <button v-if="registerProcess.registerMode" @click="clearForm()"
              class="w-36 py-2 px-4 rounded-md text-white text-base bg-gray-600 cursor-pointer hover:bg-gray-800">
              {{ $t('reset') }}
            </button>
            <button v-if="registerProcess.registerMode && !isLoading" @click="sendActivationCode()"
              class="w-36 py-2 px-4 rounded-md text-white text-base bg-blue-600 cursor-pointer hover:bg-blue-800">
              {{ $t('send') }}
            </button>
            <button v-if="isLoading" class="w-36 p-2 rounded-md text-white text-base bg-blue-500 select-none">
              <div class="flex items-center justify-center">
                <Spinners270RingIcon
                  class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
                <span>{{ $t('saving') }}</span>
              </div>
            </button>
            <button v-if="registerProcess.checkingMode" @click="skipConfirmation"
              class="w-36 py-2 px-4 rounded-md text-white text-base bg-gray-600 cursor-pointer hover:bg-gray-800">
              {{ $t('skip') }}
            </button>
            <button v-if="registerProcess.checkingMode" @click="createCustomer()"
              class="w-36 py-2 px-4 rounded-md text-white text-base bg-blue-600 cursor-pointer hover:bg-blue-800">
              {{ $t('confirmation') }}
            </button>
            <button v-if="registerProcess.congratulationMode" @click="closeModal()"
              class="w-36 py-2 px-4 rounded-md text-white text-base bg-blue-600 cursor-pointer hover:bg-blue-800">
              {{ $t('finish') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
