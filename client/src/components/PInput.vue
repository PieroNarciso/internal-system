<template>
  <input
    v-bind="$attrs"
    type="text"
    :value="modelValue"
    @input="updateModelValue"
    class="placeholder-gray-400"
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
