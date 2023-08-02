<script setup>
import { useI18n } from 'vue-i18n'
import 'izitoast/dist/css/iziToast.min.css'
import XIcon from '../../assets/icons/XIcon.vue'
import VisitService from '../../services/visit.service'
import { useModalStore } from '../../store/modal.store'
import { ref, watch } from 'vue'

const { t } = useI18n()

const vFocus = {
  mounted: (el) => el.focus()
}

const getData = (event) => {
  VisitService.gettttttt(event.target.value)
    .then((res) => {
      console.log(res)
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

</script>
<template>
  <div v-if="useModalStore().isShowQRCodeCustomer"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative max-w-xl p-4 w-full h-full md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-3xl font-medium">Kartani Scanerlang</div>
          <button @click="useModalStore().closeQRCodeCustomerModal"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="text-center py-10">
          <input type="text" class="rounded w-4/5" v-focus @input="getData">
        </div>
        <!-- <div class="py-4 px-6 text-center space-y-6">
          <button @click="deleteData(selectedUser?.id)" type="button"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">Nima
            bu???
          </button>
          <button @click="closeModal()" type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            {{ $t('noCancel') }}
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>
