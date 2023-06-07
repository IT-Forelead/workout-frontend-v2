<script setup>
import { computed, ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import CustomerTariffService from '../../services/customerTariff.service'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import XIcon from '../Icons/XIcon.vue'
import Spinners270RingIcon from '../Icons/Spinners270RingIcon.vue'
import PaymentService from '../../services/payment.service.js'
import SelectProductOptionType from '../Inputs/SelectProductOptionType.vue'
import ProductService from '../../services/product.service.js'
const { t } = useI18n()

const count = ref(0)

const selectedProductType = computed(() => {
  return useDropdownStore().selectProductTypeOption
})

const clearForm = () => {
  useDropdownStore().setSelectProductTypeOption('')
  count.value = 0
}

const closeModal = () => {
  useModalStore().closeAddProductModal()
  clearForm()
}

const isLoading = ref(false)

const submitServiceData = () => {

  if (!selectedProductType.value?.id) {
    notify.warning({
      message: t('plsEnterProductName'),
    })
  } else {
    isLoading.value = true
    ProductService.createProduct(
      cleanObjectEmptyFields({
        productId: selectedCustomer.value?.id,
      })
    ).then((data) => {
      notify.success({
        message: t('customerTariffCreated'),
      })
      isLoading.value = false
      if (cost.value > 0) {
        PaymentService.createPayment(
          cleanObjectEmptyFields({
            customerTariffId: data?.id,
            price: cost.value,
          })
        ).then(() => {
          notify.success({
            message: t('paymentCreated'),
          })
        })
          .catch((err) => {
            notify.error({
              message: t('errorCreatingPayment'),
            })
          })
      }

      closeModal()
    })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingCustomerTariff'),
        })
        isLoading.value = false
      })
  }
}
</script>
<template>
  <div v-if="useModalStore().isAddProductModalOpen"
       class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('addProduct') }}</div>
          <button @click="closeModal()"
                  class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label for="serviceName">{{ $t('productName') }}</label>
            <input class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg"
                   type="text" id="serviceName" :placeholder="$t('enterProductName')" />
          </div>
          <div>
            <label>{{ $t('productType') }}</label>
            <SelectProductOptionType />
          </div>
          <div>
            <label for="serviceName">{{ $t('productNumber') }}</label>
            <input class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg"
                   type="text" id="serviceName" :placeholder="$t('enterProductNumber')" />
          </div>
        </div>

        <div class="flex items-center justify-end p-4 space-x-2 border-t dark:border-gray-600">
          <button @click="clearForm()"
                  class="w-36 py-2 px-4 rounded-md text-white text-base bg-gray-600 cursor-pointer hover:bg-gray-800">
            {{ $t('reset') }}
          </button>
          <button v-if="!isLoading" @click="submitServiceData()"
                  class="w-36 py-2 px-4 rounded-md text-white text-base bg-blue-600 cursor-pointer hover:bg-blue-800">
            {{ $t('save') }}
          </button>
          <button v-else class="w-36 p-2 rounded-md text-white text-base bg-blue-500 select-none">
            <div class="flex items-center justify-center">
              <Spinners270RingIcon
                class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
              <span>{{ $t('saving') }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


