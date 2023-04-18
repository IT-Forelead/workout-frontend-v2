<script setup>
import { reactive } from '@vue/reactivity'
import { useModalStore } from '../../store/modal.store'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import CustomerService from '../../services/customer.service'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import XIcon from '../Icons/XIcon.vue'

const { t } = useI18n()

const customerForm = reactive({
  firstname: '',
  lastname: '',
  phone: '',
  gender: '',
})

const clearForm = () => {
  customerForm.firstname = ''
  customerForm.lastname = ''
  customerForm.gender = ''
  customerForm.phone = ''
}

const submitCustomerData = () => {
  if (!customerForm.firstname) {
    notify.warning({
      message: t('plsEnterFirstname'),
    })
  } else if (!customerForm.lastname) {
    notify.warning({
      message: t('plsEnterLastname'),
    })
  } else if (!customerForm.phone) {
    notify.warning({
      message: t('plsEnterPhone'),
    })
  } else if (!customerForm.gender) {
    notify.warning({
      message: t('plsEnterGender'),
    })
  } else {
    CustomerService.createCustomer(
      cleanObjectEmptyFields({
        firstname: customerForm.firstname,
        lastname: customerForm.lastname,
        gender: customerForm.gender,
        phone: customerForm.phone.replace(/([() -])/g, ''),
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
  <div v-if="useModalStore().isModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('addCustomer') }}</div>
          <button @click="useModalStore().closeModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="p-6">
          <div>
            <label for="firstname">{{ $t('firstname') }}</label>
            <input v-model="customerForm.firstname"
              class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" id="firstname"
              :placeholder="$t('enterFirstname')" />
          </div>
          <div>
            <label for="lastname">{{ $t('lastname') }}</label>
            <input v-model="customerForm.lastname"
              class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" id="lastname"
              :placeholder="$t('enterLastname')" />
          </div>
          <div>
            <label for="phone">{{ $t('phone') }}</label>
            <input v-model="customerForm.phone"
              class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text"
              v-mask="'+998(##) ###-##-##'" placeholder="+998(00) 000-00-00" />
          </div>
          <div>
            <label for="gender">{{ $t('gender') }}</label>
            <select v-model="customerForm.gender" id="gender"
              class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5">
              <option value="" selected>{{ $t('selectGender') }}</option>
              <option value="male">{{ $t('male') }}</option>
              <option value="female">{{ $t('female') }}</option>
            </select>
          </div>
          <div class="flex items-center justify-end space-x-2">
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
