import { defineStore } from 'pinia'

export const useCustomerTariffStore = defineStore('customerTariff', {
  state: () => ({
    customerTariffs: [],
    selectedCustomerTariff: {},
  }),
  actions: {
    setCustomerTariffs(data) {
      this.customerTariffs.push(...data)
    },
    setSelectedCustomerTariff(data) {
      this.selectedCustomerTariff = data
    },
    clearStore() {
      this.customerTariffs = []
    },
  },
})
