import { defineStore } from 'pinia'

export const useSoldProductStore = defineStore('soldProduct', {
  state: () => ({
    soldProducts: [],
  }),
  actions: {
    setSoldProducts(data) {
      this.soldProducts.push(...data)
    },
    setAutoRefreshSoldProducts(data) {
      if (data) {
        data.map((soldProduct) => {
          if (!this.soldProducts.map(v => v?.product?.createdAt).includes(soldProduct?.product?.createdAt)) {
            this.soldProducts.push(soldProduct)
          }
        })
      }
    },
    clearStore() {
      this.soldProducts = []
    },
  },
})
