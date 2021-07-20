<template>
  <svg class="h-5 w-5" v-bind="$attrs" viewBox="0 0 24 24">
    <path v-if="name === 'plus'" fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    }
  },
})
</script>

