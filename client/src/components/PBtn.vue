<template>
  <button class="flex items-center focus:outline-none px-3 py-2" v-bind="$attrs" type="button">
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

