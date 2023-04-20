import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isAddUserModalOpen: false,
    isAddCustomerModalOpen: false,
    isAddServiceModalOpen: false,
    isAddTrainerServiceModalOpen: false,
    isAddCustomerTariffModalOpen: false,
    isOpenDeleteAlertModal: false,
    isOpenFilterBy: false,
    isOpenNotification: false,
    isOpenProfileDropDown: false,
  }),
  actions: {
    openAddUserModal() {
      this.isAddUserModalOpen = true
    },
    closeAddUserModal() {
      this.isAddUserModalOpen = false
    },
    openAddCustomerModal() {
      this.isAddCustomerModalOpen = true
    },
    closeAddCustomerModal() {
      this.isAddCustomerModalOpen = false
    },
    openAddServiceModal() {
      this.isAddServiceModalOpen = true
    },
    closeAddServiceModal() {
      this.isAddServiceModalOpen = false
    },
    openAddTrainerServiceModal() {
      this.isAddTrainerServiceModalOpen = true
    },
    closeAddTrainerServiceModal() {
      this.isAddTrainerServiceModalOpen = false
    },
    openAddCustomerTariffModal() {
      this.isAddCustomerTariffModalOpen = true
    },
    closeAddCustomerTariffModal() {
      this.isAddCustomerTariffModalOpen = false
    },
    openDeleteAlertModal() {
      this.isOpenDeleteAlertModal = true
    },
    closeDeleteAlertModal() {
      this.isOpenDeleteAlertModal = false
    },
    toggleFilterBy() {
      this.isOpenFilterBy = !this.isOpenFilterBy
    },
    toggleNotification() {
      this.isOpenNotification = !this.isOpenNotification
    },
    toggleProfile() {
      this.isOpenProfileDropDown = !this.isOpenProfileDropDown
    },
  },
})
