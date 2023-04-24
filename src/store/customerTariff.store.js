import { defineStore } from 'pinia'

export const useCustomerTariffStore = defineStore('customerTariff', {
  state: () => ({
    customerTariffs: [],
    selectedCustomerTariff: {},
    customers: []
  }),
  actions: {
    setCustomerTariffs(data) {
      this.customerTariffs.push(...data)
    },
    setCustomers(data) {
      this.customers = data
    },
    setSelectedCustomerTariff(data) {
      this.selectedCustomerTariff = data
    },
    clearStore() {
      this.customerTariffs = []
    },
  },
})
