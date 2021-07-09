<template>
 <custom-header
  @create-account="handleCreateAccount"
  @login="handleLogin"
 />
 <contact/>
 <div class="flex justify-center py-10 bg-brand-gray">
   <p class="font-medium text-center text-gray-800">feedbacker © 2021</p>
 </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CustomHeader from '@/views/Home/CustomHeader'
import Contact from '@/views/Home/Contact'

export default {
  components: {
    'custom-header': CustomHeader,
    contact: Contact
  },
  setup () {
    const router = useRouter()

    onMounted(() => {
      const token = window.localStorage.getItem('token')
      if (token) {
        router.push({ name: 'Feedbacks' })
      }
    })

    function handleLogin () {
    }

    function handleCreateAccount () {
    }

    return {
      handleLogin,
      handleCreateAccount
    }
  }
}
</script>
