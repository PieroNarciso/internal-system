<template>
  <svg class="h-5 w-5" v-bind="$attrs" viewBox="0 0 24 24">
    <path v-if="name === 'plus'" fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    <path v-else-if="name === 'menu'" fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    <path v-else-if="name === 'login'" fill="currentColor" d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
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

