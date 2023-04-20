import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    payments: [],
    selectedPayment: {},
  }),
  actions: {
    setPayments(data) {
      this.payments.push(...data)
    },
    setSelectedPayment(data) {
      this.selectedPayment = data
    },
    clearStore() {
      this.payments = []
    },
  },
})
