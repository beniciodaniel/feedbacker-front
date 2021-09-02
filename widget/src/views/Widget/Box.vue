<template>
  <div class="box animate__animated animate__fadeInUp animate__faster">
    <div
      :class="{
        'justify-between': canShowAdditionalControlAndInfo,
        'justify-end': !canShowAdditionalControlAndInfo,
      }"
      class="relative w-full flex"
    >
      <button
        v-if="canShowAdditionalControlAndInfo"
        @click="() => {}"
        :disabled="canGoBack"
        :class="{
          invisible: canGoBack,
        }"
        class="text-xl text-gray-800"
      >
        <icon name="back" :color="colors.gray['800']" />
      </button>

      <p
        v-if="canShowAdditionalControlAndInfo"
        class="text-xl font-black text-center text-brand-main"
      >
        {{ label }}
      </p>

      <button
        @click="() => emit('close-box')"
        class="text-xl text-gray-800"
      >
        <icon size="14" name="close" :color="colors.gray['800']"  />
      </button>
    </div>

    wizard

    <div class="text-gray-800 text-sm flex" v-if="canShowAdditionalControlAndInfo">
      <icon name="chat" class="mr-1" :color="brandColors.graydark" />
      widget by
      <span class="ml-1 font-bold">
        feedbacker
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, SetupContext } from 'vue'
import { brand } from '../../../palette'
import Icon from '../../components/Icon/index.vue'
import colors from 'tailwindcss/colors'
import useStore from '../../hooks/state'

interface SetupReturn {
  brandColors: Record<string, string>
  canGoBack: ComputedRef<boolean>
  canShowAdditionalControlAndInfo: ComputedRef<boolean>
  colors: Record<string, string>
  emit: SetupContext['emit']
  label: ComputedRef<string>
}

export default defineComponent({
  emits: ['close-box'],
  components: { Icon },
  setup (_, { emit }: SetupContext): SetupReturn {
    const store = useStore()

    const label = computed<string>(() => {
      if (store.feedbackType === 'ISSUE') {
        return 'Reporte um problema'
      }

      if (store.feedbackType === 'IDEA') {
        return 'Nos fale a sua ideia'
      }

      if (store.feedbackType === 'OTHER') {
        return 'Abra sua mente'
      }

      return 'O que você tem em mente?'
    })

    const canGoBack = computed<boolean>(() => {
      return store.currentComponent === 'SelectFeedbackType'
    })

    const canShowAdditionalControlAndInfo = computed<boolean>(() => {
      return store.currentComponent !== 'Success' && store.currentComponent !== 'Error'
    })

    return {
      brandColors: brand,
      canGoBack,
      canShowAdditionalControlAndInfo,
      colors,
      emit,
      label
    }
  }
})
</script>

<style lang="postcss" scoped>
.box {
  @apply fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-white rounded-xl
    py-5 px-5 flex flex-col items-center shadow-xl select-none;
  width: 400px;
}
</style>
