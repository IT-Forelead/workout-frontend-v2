import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
    selectedCustomer: {},
  }),
  actions: {
    setCustomers(data) {
      this.customers.push(...data)
    },
    setSelectedCustomer(data) {
      this.selectedCustomer = data
    },
    clearStore() {
      this.customers = []
    },
  },
})
