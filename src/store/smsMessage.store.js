import { defineStore } from 'pinia'

export const useSmsMessageStore = defineStore('smsMessage', {
  state: () => ({
    smsMessages: [],
  }),
  actions: {
    setSmsMessages(data) {
      this.smsMessages.push(...data)
    },
    clearStore() {
      this.smsMessages = []
    },
  },
})
