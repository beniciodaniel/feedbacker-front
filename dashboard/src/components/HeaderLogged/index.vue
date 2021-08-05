<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-36">
      <img class="w-full" src="../../assets/images/logo_white.png" alt="logo">
    </div>
    <div class="flex">
      <ul class="flex list-none">
        <li class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none" @click="() => router.push({name: 'Credentials'})">
          Credenciais
        </li>
        <li class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none" @click="() => router.push({name: 'Feedbacks'})">
          Feedbacks
        </li>
        <li id="logout-button" @click="handleLogout" class="px-6 py-2 font-bold bg-white rounded-full cursor-pointer text-brand-main focus:outline-none">
          {{ logoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { cleanCurrentUser } from '../../store/user'
import useStore from '../../hooks/useStore'

export default {
  setup () {
    const router = useRouter()
    const store = useStore('User')

    const logoutLabel = computed(() => {
      if (!store.currentUser.name || store.currentUser === 'undefined') {
        return '...'
      }
      return `${store.currentUser.name} (sair)`
    })

    function handleLogout () {
      window.localStorage.removeItem('token')
      cleanCurrentUser()
      router.push({ name: 'Home' })
    }

    return {
      router,
      logoutLabel,
      handleLogout
    }
  }
}
</script>

<style>

</style>
