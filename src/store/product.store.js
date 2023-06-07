import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    selectedProduct: {},
  }),
  actions: {
    setProducts(data) {
      this.products.push(...data)
    },
    setSelectedCustomer(data) {
      this.selectedProduct = data
    },
    clearStore() {
      this.products = []
    },
  },
})
