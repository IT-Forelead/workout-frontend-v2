import { defineStore } from 'pinia'

export const useDropdownStore = defineStore('dropdown', {
  state: () => ({
    selectPaymentStatusOption: '',
    selectDeliveryStatusOption: '',
    selectGenderOption: '',
    selectRoleOption: '',
    selectServiceTypeOption: '',
    selectDurationDayOption: '',
    selectMonthlyArrivalOption: '',
    selectTrainerOption: '',
    selectCustomerOption: '',
    isOpenSelectLanguage: false,
    isOpenPaymentStatusDropDown: false,
    isOpenDeliveryStatusDropDown: false,
    isOpenServiceTypeDropDown: false,
    isOpenGenderDropDown: false,
    isOpenRoleDropDown: false,
    isOpenDurationDayDropDown: false,
    isOpenMonthlyArrivalDropDown: false,
    isOpenTrainerDropDown: false,
    isOpenCustomerDropDown: false,
  }),
  actions: {
    setSelectPaymentStatusOption(data) {
      this.selectPaymentStatusOption = data
    },
    setSelectDeliveryStatusOption(data) {
      this.selectDeliveryStatusOption = data
    },
    setSelectGenderOption(data) {
      this.selectGenderOption = data
    },
    setSelectRoleOption(data) {
      this.selectRoleOption = data
    },
    setSelectServiceTypeOption(data) {
      this.selectServiceTypeOption = data
    },
    setSelectTrainerOption(data) {
      this.selectTrainerOption = data
    },
    setSelectDurationDayOption(data) {
      this.selectDurationDayOption = data
    },
    setSelectMonthlyArrivalOption(data) {
      this.selectMonthlyArrivalOption = data
    },
    setSelectCustomerOption(data) {
      this.selectCustomerOption = data
    },
    openSelectLanguage() {
      this.isOpenSelectLanguage = true
    },
    closeSelectLanguage() {
      this.isOpenSelectLanguage = false
    },
    openTrainerDropdown() {
      this.isOpenTrainerDropDown = true
    },
    closeTrainerDropdown() {
      this.isOpenTrainerDropDown = false
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
    openServiceTypeDropDown() {
      this.isOpenServiceTypeDropDown = true
    },
    closeServiceTypeDropDown() {
      this.isOpenServiceTypeDropDown = false
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
    openCustomerDropDown() {
      this.isOpenCustomerDropDown = true
    },
    closeCustomerDropDown() {
      this.isOpenCustomerDropDown = false
    },
    clearStore() {
      this.selectPaymentStatusOption = ''
      this.selectDeliveryStatusOption = ''
      this.selectGenderOption = ''
      this.selectRoleOption = ''
      this.selectServiceTypeOption = ''
      this.selectDurationDayOption = ''
      this.selectMonthlyArrivalOption = ''
      this.selectTrainerOption = ''
      this.isOpenSelectLanguage = false
      this.isOpenPaymentStatusDropDown = false
      this.isOpenDeliveryStatusDropDown = false
      this.isOpenServiceTypeDropDown = false
      this.isOpenGenderDropDown = false
      this.isOpenRoleDropDown = false
      this.isOpenDurationDayDropDown = false
      this.isOpenMonthlyArrivalDropDown = false
      this.isOpenTrainerDropDown = false
    },
  },
})
