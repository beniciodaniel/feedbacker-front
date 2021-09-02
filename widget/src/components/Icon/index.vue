<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import ChevronDown from './ChevronDown.vue'
import Copy from './Copy.vue'
import Loading from './Loading.vue'
import Chat from './Chat.vue'
import Close from './Close.vue'
import Back from './Back.vue'

export default {
  components: { Loading, Copy, Chat, ChevronDown, Close, Back },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
