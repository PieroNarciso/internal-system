<template>
  <p-input v-model="input" placeholder="Hola"/>
  <p-button icon="plus">Hola</p-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PInput from '@/components/PInput.vue';
import PButton from '@/components/PButton.vue';

export default defineComponent({
  name: 'App',
  components: {
    PInput,
    PButton,
  },
  setup() {
    const input = ref('');

    return {
      input,
    }
  }
})
</script>
