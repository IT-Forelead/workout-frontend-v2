import { defineStore } from 'pinia'

export const useSoldProductStore = defineStore('product/report', {
  state: () => ({
    salesReports: [],
  }),
  actions: {
    setSalesReports(data) {
      this.salesReports.push(...data)
    },
    setSalesReports(data) {
      this.salesReports = data
    },
    clearStore() {
      this.salesReports = []
    },
  },
})
