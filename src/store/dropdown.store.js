import { defineStore } from 'pinia'

export const useDropdownStore = defineStore('dropdown', {
  state: () => ({
    selectPaymentStatusOption: '',
    isOpenSelectLanguage: false,
    isOpenPaymentStatusDropDown: false,
  }),
  actions: {
    setSelectPaymentStatusOption(data) {
      this.selectPaymentStatusOption = data
    },
    openSelectLanguage() {
      this.isOpenSelectLanguage = true
    },
    closeSelectLanguage() {
      this.isOpenSelectLanguage = false
    },
    openPaymentStatusDropDown() {
      this.isOpenPaymentStatusDropDown = true
    },
    closePaymentStatusDropDown() {
      this.isOpenPaymentStatusDropDown = false
    },
    clearStore() {
      this.selectPaymentStatusOption = ''
      this.isOpenSelectLanguage = false
      this.isOpenPaymentStatusDropDown = false
    },
  },
})
