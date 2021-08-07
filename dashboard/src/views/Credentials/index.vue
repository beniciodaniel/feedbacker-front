<template>
 <div class="flex justify-center w-full h-28 bg-brand-main">
   <header-logged />
 </div>

 <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
   <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>
   <p class="text-lg text-center text-gray-800 font-regular">Guia de instalação e geração de suas credenciais</p>
 </div>

 <div class="flex justify-center w-full h-full">
   <div class="flex flex-col w-4/5 max-w-6xl py-10">
    <h1 class="text-3xl font-black text-brand-darkgray">
      Instalação e configuração
    </h1>
    <p class="mt-10 text-lg text-gray-800 font-regular">
      Esta aqui é a sua chave api
    </p>

    <content-loader
      v-if="store.Global.isLoading"
      class="rounded"
      width="600px"
      height="50px"
     />
    <div v-else class="flex py-3 pl-5 mt-2 rounded items-center bg-brand-gray w-full lg:w-1/2 justify-between">
      <span v-if="state.hasError">Erro ao carregar a apikey</span>
      <span id="apiKey" v-else>{{ store.User.currentUser.apiKey }}</span>
      <div v-if="!state.hasError" class="flex ml-20 mr-5">
        <icon @click="handleCopy" name='copy' :color="brandColors.graydark" size="24" class="cursor-pointer" />
        <icon id="generate-apikey" @click="handleGenerateApiKey" name='loading' :color="brandColors.graydark" size="24" class="cursor-pointer ml-3" />
      </div>
    </div>

    <p class="mt-5 text-lg text-gray-800 font-regular">
      Coloque o script abaixo no seu site para começar a receber feedbacks
    </p>
    <content-loader
      v-if="store.Global.isLoading || state.isLoading"
      class="rounded"
      width="600px"
      height="50px"
     />
    <div v-else class="py-3 pl-5 pr-20 rounded mt-2 bg-brand-gray w-full lg:w-2/3 overflow-x-scroll">
      <span v-if="state.hasError">Erro ao carregar o script</span>
      <pre v-else>&lt;script src="https://beniciodaniel-feedbacker-widget.netlify.app?api_key={{store.User.currentUser.apiKey}}"&gt;&lt;/script&gt;</pre>
    </div>
   </div>
 </div>
</template>

<script>
import HeaderLogged from '@/components/HeaderLogged'
import ContentLoader from '@/components/ContentLoader'
import Icon from '@/components/Icon'
import useStore from '../../hooks/useStore'
import palette from '../../../palette'
import services from '../../services'
import { reactive, watch } from 'vue'
import { setAPIKey } from '../../store/user'
import { useToast } from 'vue-toastification'

export default {
  components: { ContentLoader, HeaderLogged, Icon },
  setup () {
    const store = useStore()
    const toast = useToast()
    const state = reactive({
      hasError: false,
      isLoading: false
    })

    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handleError(true)
      }
    })

    function handleError (error) {
      state.isLoading = false
      state.hasError = !!error
    }

    async function handleGenerateApiKey () {
      try {
        state.isLoading = true
        const { data } = await services.users.generateApiKey()
        console.log('HANDLE GENERATE: ', data)
        setAPIKey(data.apiKey)

        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    async function handleCopy () {
      toast.clear()
      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey)
        toast.success('Copiado!')
      } catch (error) {
        handleError(error)
      }
    }

    return {
      store,
      state,
      brandColors: palette.brand,
      handleGenerateApiKey,
      handleCopy
    }
  }
}
</script>
