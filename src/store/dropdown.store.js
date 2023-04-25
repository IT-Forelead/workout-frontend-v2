import { defineStore } from 'pinia'

export const useDropdownStore = defineStore('dropdown', {
  state: () => ({
    selectPaymentTypeOption: '',
    selectPaymentStatusOption: '',
    selectDeliveryStatusOption: '',
    selectGenderOption: '',
    selectRoleOption: '',
    selectServiceOption: '',
    selectServiceTypeOption: '',
    selectTrainerServiceOption: '',
    selectDurationDayOption: '',
    selectMonthlyArrivalOption: '',
    selectTrainerOption: '',
    selectCustomerOption: '',
    isOpenSelectLanguage: false,
    isOpenPaymentTypeDropDown: false,
    isOpenPaymentStatusDropDown: false,
    isOpenDeliveryStatusDropDown: false,
    isOpenServiceDropDown: false,
    isOpenServiceTypeDropDown: false,
    isOpenTrainerServiceDropDown: false,
    isOpenGenderDropDown: false,
    isOpenRoleDropDown: false,
    isOpenDurationDayDropDown: false,
    isOpenMonthlyArrivalDropDown: false,
    isOpenTrainerDropDown: false,
    isOpenCustomerDropDown: false,
  }),
  actions: {
    setSelectPaymentTypeOption(data) {
      this.selectPaymentTypeOption = data
    },
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
    setSelectServiceOption(data) {
      this.selectServiceOption = data
    },
    setSelectServiceTypeOption(data) {
      this.selectServiceTypeOption = data
    },
    setSelectTrainerServiceOption(data) {
      this.selectTrainerServiceOption = data
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
    openPaymentTypeDropDown() {
      this.isOpenPaymentTypeDropDown = true
    },
    closePaymentTypeDropDown() {
      this.isOpenPaymentTypeDropDown = false
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
    openServiceDropDown() {
      this.isOpenServiceDropDown = true
    },
    closeServiceDropDown() {
      this.isOpenServiceDropDown = false
    },
    openServiceTypeDropDown() {
      this.isOpenServiceTypeDropDown = true
    },
    closeServiceTypeDropDown() {
      this.isOpenServiceTypeDropDown = false
    },
    openTrainerServiceDropDown() {
      console.log("asdasdasd");
      this.isOpenTrainerServiceDropDown = true
    },
    closeTrainerServiceDropDown() {
      this.isOpenTrainerServiceDropDown = false
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
      this.selectPaymentTypeOption = ''
      this.selectPaymentStatusOption = ''
      this.selectDeliveryStatusOption = ''
      this.selectGenderOption = ''
      this.selectRoleOption = ''
      this.selectServiceOption = ''
      this.selectServiceTypeOption = ''
      this.selectTrainerServiceOption = ''
      this.selectDurationDayOption = ''
      this.selectMonthlyArrivalOption = ''
      this.selectTrainerOption = ''
      this.isOpenSelectLanguage = false
      this.isOpenPaymentTypeDropDown = false
      this.isOpenPaymentStatusDropDown = false
      this.isOpenDeliveryStatusDropDown = false
      this.isOpenServiceDropDown = false
      this.isOpenServiceTypeDropDown = false
      this.isOpenTrainerServiceDropDown = false
      this.isOpenGenderDropDown = false
      this.isOpenRoleDropDown = false
      this.isOpenDurationDayDropDown = false
      this.isOpenMonthlyArrivalDropDown = false
      this.isOpenTrainerDropDown = false
    },
  },
})
