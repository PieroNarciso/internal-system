<template>
  <input
    v-bind="$attrs"
    type="text"
    :value="modelValue"
    @input="updateModelValue"
    class="placeholder-gray-400 ring-1 focus:ring-1 ring-gray-500 border-gray-500 focus:ring-indigo-500"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
    },
  },
  setup(_, context) {
    const updateModelValue = (event: { target: HTMLInputElement }) => {
      context.emit('update:modelValue', event.target.value);
    };

    return {
      updateModelValue,
    };
  },
});
</script>
