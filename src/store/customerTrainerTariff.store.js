import { defineStore } from 'pinia'

export const useCustomerTrainerTariffStore = defineStore('customerTrainerTariff', {
  state: () => ({
    customerTrainerTariffs: [],
    selectedCustomerTrainerTariff: {},
  }),
  actions: {
    setCustomerTrainerTariffs(data) {
      this.customerTrainerTariffs.push(...data)
    },
    setSelectedCustomerTrainerTariff(data) {
      this.selectedCustomerTrainerTariff = data
    },
    clearStore() {
      this.customerTrainerTariffs = []
    },
  },
})
