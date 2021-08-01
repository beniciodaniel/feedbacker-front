<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import ChevronDown from './ChevronDown.vue'
import Copy from './Copy.vue'
import Loading from './Loading.vue'

export default {
  components: { Loading, Copy, ChevronDown },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
