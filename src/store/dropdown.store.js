import { defineStore } from 'pinia'

export const useDropdownStore = defineStore('dropdown', {
  state: () => ({
    selectPaymentTypeOption: '',
    selectVisitTypeOption: '',
    selectMessageTypeOption: '',
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
    selectCustomerTariffOption: '',
    selectCustomerTrainerTariffOption: '',
    isOpenSelectLanguage: false,
    isOpenPaymentTypeDropDown: false,
    isOpenVisitTypeDropDown: false,
    isOpenMessageTypeDropDown: false,
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
    isOpenCustomerTariffDropDown: false,
    isOpenCustomerTrainerTariffDropDown: false,
  }),
  actions: {
    setSelectPaymentTypeOption(data) {
      this.selectPaymentTypeOption = data
    },
    setSelectVisitTypeOption(data) {
      this.selectVisitTypeOption = data
    },
    setSelectMessageTypeOption(data) {
      this.selectMessageTypeOption = data
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
    setSelectCustomerTariffOption(data) {
      this.selectCustomerTariffOption = data
    },
    setSelectCustomerTrainerTariffOption(data) {
      this.selectCustomerTrainerTariffOption = data
    },
    openCustomerTariffDropDown() {
      this.isOpenCustomerTariffDropDown = true
    },
    closeCustomerTariffDropDown() {
      this.isOpenCustomerTariffDropDown = false
    },
    openCustomerTrainerTariffDropDown() {
      this.isOpenCustomerTrainerTariffDropDown = true
    },
    closeCustomerTrainerTariffDropDown() {
      this.isOpenCustomerTrainerTariffDropDown = false
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
    openVisitTypeDropDown() {
      this.isOpenVisitTypeDropDown = true
    },
    closeVisitTypeDropDown() {
      this.isOpenVisitTypeDropDown = false
    },
    openMessageTypeDropDown() {
      this.isOpenMessageTypeDropDown = true
    },
    closeMessageTypeDropDown() {
      this.isOpenMessageTypeDropDown = false
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
      this.selectVisitTypeOption = ''
      this.selectMessageTypeOption = ''
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
      this.selectCustomerTariffOption = ''
      this.selectCustomerTrainerTariffOption = ''
      this.isOpenSelectLanguage = false
      this.isOpenPaymentTypeDropDown = false
      this.isOpenVisitTypeDropDown = false
      this.isOpenMessageTypeDropDown = false
      this.isOpenPaymentStatusDropDown = false
      this.isOpenDeliveryStatusDropDown = false
      this.isOpenServiceDropDown = false
      this.isOpenServiceTypeDropDown = false
      this.isOpenTrainerServiceDropDown = false
      this.isOpenGenderDropDown = false
      this.isOpenRoleDropDown = false
      this.isOpenDurationDayDropDown = false
      this.isOpenMonthlyArrivalDropDown = false
      this.isOpenTrainerDropDown = false,
      this.isOpenCustomerTariffDropDown = false
      this.isOpenCustomerTrainerTariffDropDown = false
    },
  },
})
