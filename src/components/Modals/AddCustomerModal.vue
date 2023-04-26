<script setup>
import { computed, reactive } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import CustomerService from '../../services/customer.service'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import XIcon from '../Icons/XIcon.vue'
import SelectOptionGender from '../Inputs/SelectOptionGender.vue'
import ImageIcon from '../Icons/ImageIcon.vue'

const { t } = useI18n()

const selectGender = computed(() => {
  return useDropdownStore().selectGenderOption
})

const submitForm = reactive({
  firstname: '',
  lastname: '',
  phone: '',
})

const clearForm = () => {
  submitForm.firstname = ''
  submitForm.lastname = ''
  submitForm.phone = ''
  useDropdownStore().clearStore()
}

const closeModal = () => {
  useModalStore().closeAddCustomerModal()
  clearForm()
}

const submitCustomerData = () => {
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
  } else if (!selectGender.value?.id) {
    notify.warning({
      message: t('plsSelectGender'),
    })
  } else {
    CustomerService.createCustomer(
      cleanObjectEmptyFields({
        firstname: submitForm.firstname,
        lastname: submitForm.lastname,
        gender: selectGender.value?.id,
        phone: submitForm.phone.replace(/([() -])/g, ''),
      })
    )
      .then(() => {
        clearForm()
        notify.success({
          message: t('customerCreated'),
        })
        CustomerService.getCustomers({})
          .then((res) => {
            useCustomerStore().clearStore()
            setTimeout(() => {
              useCustomerStore().setCustomers(res?.data)
            }, 500)
          })
          .catch(() => {
            notify.error({
              message: t('errorGettingCustomers'),
            })
          })
      })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingCustomer'),
        })
      })
  }
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
            <!-- 01 -->
            <div class="flex items-center justify-between">
              <div class="flex items-center justify-between">
                <div
                  class="flex items-center justify-center w-10 h-10 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-full text-md">
                  01
                </div>
                <div class="ml-3 font-semibold text-blue-500 text-md">
                  {{ $t('customerData') }}
                </div>
              </div>
              <div class="relative mt-1 ml-7 md:-left-8 md:ml-0">
                <div class="absolute bottom-0 border-r border-gray-300 rounded-lg -rotate-[25deg] h-9"></div>
                <div class="absolute border-r border-gray-300 rounded-lg rotate-[25deg] -top-1 h-9"></div>
              </div>
            </div>
            <!-- 02 -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div
                  class="flex items-center justify-center w-10 h-10 font-semibold text-gray-500 bg-white border-2 border-gray-300 rounded-full text-md">
                  02
                </div>
                <div class="ml-3 font-semibold text-gray-500 text-md">
                  {{ $t('confirmation') }}
                </div>
              </div>
              <div class="relative mt-1 ml-7 md:-left-8 md:ml-0">
                <div class="absolute bottom-0 border-r border-gray-300 rounded-lg -rotate-[25deg] h-9"></div>
                <div class="absolute border-r border-gray-300 rounded-lg rotate-[25deg] -top-1 h-9"></div>
              </div>
            </div>
            <!-- 03 -->
            <div class="flex items-center">
              <div
                class="flex items-center justify-center w-10 h-10 font-semibold text-gray-500 bg-white border-2 border-gray-300 rounded-full text-md">
                03
              </div>
              <div class="ml-3 font-semibold text-gray-500 text-md">
                {{ $t('finish') }}
              </div>
            </div>
          </div>
        </div>
        <div class="grid gap-5 grid-cols-2 p-5">
          <div class="flex flex-col col-span-2 mb-10">
            <label for="dropzone-file"
              class="relative flex items-center justify-center w-24 h-24 max-w-lg p-6 mx-auto text-center border-2 border-blue-400 border-dashed rounded-full cursor-pointer bg-slate-100 dark:bg-gray-700">
              <ImageIcon class="w-16 h-16 text-blue-500" />
              <input id="dropzone-file" type="file" class="hidden" name="image" />
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
            <input v-model="submitForm.firstname" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg"
              type="text" id="firstname" :placeholder="$t('enterFirstname')" />
          </div>
          <div>
            <label for="phone">{{ $t('phone') }}</label>
            <input v-model="submitForm.phone" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg"
              type="text" v-mask="'+998(##) ###-##-##'" placeholder="+998(00) 000-00-00" />
          </div>
          <div>
            <label>{{ $t('gender') }}</label>
            <SelectOptionGender />
          </div>
        </div>
        <div class="flex items-center justify-between p-4 border-t dark:border-gray-600">
          <div class="flex items-start">
            <div class="flex items-center h-6">
              <input id="comments" name="comments" type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600">
            </div>
            <div class="ml-3 text-sm leading-6">
              <label for="comments" class="font-medium text-gray-900 dark:text-gray-300">
                {{ $t('smsVerification') }}
              </label>
            </div>
          </div>
          <div class=" space-x-2">
            <button @click="clearForm()"
              class="w-36 py-2 px-4 rounded-md text-white text-base bg-gray-600 cursor-pointer hover:bg-gray-800">
              {{ $t('reset') }}
            </button>
            <button @click="submitCustomerData()"
              class="w-36 py-2 px-4 rounded-md text-white text-base bg-blue-600 cursor-pointer hover:bg-blue-800">
              {{ $t('save') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
