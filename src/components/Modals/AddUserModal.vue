<script setup>
import { computed, reactive } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import UserService from '../../services/user.service'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import { useUserStore } from '../../store/user.store'
import XIcon from '../Icons/XIcon.vue'
import SelectOptionRole from '../Inputs/SelectOptionRole.vue'

const { t } = useI18n()

const selectRole = computed(() => {
  return useDropdownStore().selectRoleOption
})

const userForm = reactive({
  firstname: '',
  lastname: '',
  phone: '',
})

const clearForm = () => {
  userForm.firstname = ''
  userForm.lastname = ''
  userForm.phone = ''
  useDropdownStore().clearStore()
}

const closeModal = () => {
  useModalStore().closeAddUserModal()
  clearForm()
}

const submitUserData = () => {
  if (!userForm.firstname) {
    notify.warning({
      message: t('plsEnterFirstname'),
    })
  } else if (!userForm.lastname) {
    notify.warning({
      message: t('plsEnterLastname'),
    })
  } else if (!userForm.phone) {
    notify.warning({
      message: t('plsEnterPhone'),
    })
  } else if (!selectRole.value?.id) {
    notify.warning({
      message: t('plsSelectRole'),
    })
  } else {
    UserService.createUser(
      cleanObjectEmptyFields({
        firstname: userForm.firstname,
        lastname: userForm.lastname,
        role: selectRole.value?.id,
        phone: userForm.phone.replace(/([() -])/g, ''),
      })
    )
      .then(() => {
        notify.success({
          message: t('userCreated'),
        })
        UserService.getUsers({})
          .then((res) => {
            useUserStore().clearStore()
            setTimeout(() => {
              useUserStore().setUsers(res?.data)
            }, 500)
          })
          .catch(() => {
            notify.error({
              message: t('errorGettingUsers'),
            })
          })
        closeModal()
      })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingUser'),
        })
      })
  }
}

</script>
<template>
  <div v-if="useModalStore().isAddUserModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('addUser') }}</div>
          <button @click="closeModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="p-5 space-y-5">
          <div>
            <label for="lastname">{{ $t('lastname') }}</label>
            <input v-model="userForm.lastname" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg"
              type="text" id="lastname" :placeholder="$t('enterLastname')" />
          </div>
          <div>
            <label for="firstname">{{ $t('firstname') }}</label>
            <input v-model="userForm.firstname" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg"
              type="text" id="firstname" :placeholder="$t('enterFirstname')" />
          </div>
          <div>
            <label for="phone">{{ $t('phone') }}</label>
            <input v-model="userForm.phone" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg"
              type="text" v-mask="'+998(##) ###-##-##'" placeholder="+998(00) 000-00-00" />
          </div>
          <div>
            <label>{{ $t('role') }}</label>
            <SelectOptionRole />
          </div>
          <div class="flex items-center justify-end space-x-2">
            <button @click="clearForm()"
              class="w-36 py-2 px-4 rounded-md text-white text-base bg-gray-600 cursor-pointer hover:bg-gray-800">
              {{ $t('reset') }}
            </button>
            <button @click="submitUserData()"
              class="w-36 py-2 px-4 rounded-md text-white text-base bg-blue-600 cursor-pointer hover:bg-blue-800">
              {{ $t('save') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
