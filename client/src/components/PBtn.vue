<template>
  <button v-bind="$attrs" class="flex items-center focus:outline-none px-3 py-2" type="button">
    <slot />
    <template v-if="icon">
      <p-icon class="ml-2" :name="icon"></p-icon> 
    </template>
  </button> 
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PIcon from '@/components/PIcon.vue';

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    }
  },
  components: {
    PIcon,
  },
})
</script>

