import { defineStore } from 'pinia'

export const useDropdownStore = defineStore('dropdown', {
  state: () => ({
    selectPaymentStatusOption: '',
    selectDeliveryStatusOption: '',
    selectServiceTypeOption: '',
    selectGenderOption: '',
    selectRoleOption: '',
    selectDurationDayOption: '',
    selectMonthlyArrivalOption: '',
    isOpenSelectLanguage: false,
    isOpenPaymentStatusDropDown: false,
    isOpenDeliveryStatusDropDown: false,
    isOpenServiceTypeDropDown: false,
    isOpenGenderDropDown: false,
    isOpenRoleDropDown: false,
    isOpenDurationDayDropDown: false,
    isOpenMonthlyArrivalDropDown: false,
  }),
  actions: {
    setSelectPaymentStatusOption(data) {
      this.selectPaymentStatusOption = data
    },
    setSelectDeliveryStatusOption(data) {
      this.selectDeliveryStatusOption = data
    },
    setSelectServiceTypeOption(data) {
      this.selectServiceTypeOption = data
    },
    setSelectGenderOption(data) {
      this.selectGenderOption = data
    },
    setSelectRoleOption(data) {
      this.selectRoleOption = data
    },
    setSelectDurationDayOption(data) {
      this.selectDurationDayOption = data
    },
    setSelectMonthlyArrivalOption(data) {
      this.selectMonthlyArrivalOption = data
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
    openDeliveryStatusDropDown() {
      this.isOpenDeliveryStatusDropDown = true
    },
    closeDeliveryStatusDropDown() {
      this.isOpenDeliveryStatusDropDown = false
    },
    openServiceTypeDropDown() {
      this.isOpenServiceTypeDropDown = true
    },
    closeServiceTypeDropDown() {
      this.isOpenServiceTypeDropDown = false
    },
    openGenderDropDown() {
      this.isOpenGenderDropDown = true
    },
    closeGenderDropDown() {
      this.isOpenGenderDropDown = false
    },
    openRoleDropDown() {
      this.isOpenRoleDropDown = true
    },
    closeRoleDropDown() {
      this.isOpenRoleDropDown = false
    },
    openDurationDayDropDown() {
      this.isOpenDurationDayDropDown = true
    },
    closeDurationDayDropDown() {
      this.isOpenDurationDayDropDown = false
    },
    openMonthlyArrivalDropDown() {
      this.isOpenMonthlyArrivalDropDown = true
    },
    closeMonthlyArrivalDropDown() {
      this.isOpenMonthlyArrivalDropDown = false
    },
    clearStore() {
      this.selectPaymentStatusOption = ''
      this.selectDeliveryStatusOption = ''
      this.selectServiceTypeOption = ''
      this.selectGenderOption = ''
      this.selectRoleOption = ''
      this.selectDurationDayOption = ''
      this.isOpenSelectLanguage = false
      this.isOpenPaymentStatusDropDown = false
      this.isOpenDeliveryStatusDropDown = false
      this.isOpenServiceTypeDropDown = false
      this.isOpenGenderDropDown = false
      this.isOpenRoleDropDown = false
      this.isOpenDurationDayDropDown = false
      this.isOpenMonthlyArrivalDropDown = false
    },
  },
})
