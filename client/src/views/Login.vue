<template>
  <div class="bg-white shadow-md rounded-md flex flex-col px-4 py-4 space-y-3">
    <p-input class="rounded" v-model="username" placeholder="Usuario"></p-input>
    <p-input class="rounded" v-model="password" placeholder="Contraseña"></p-input>
    <p-btn class="bg-indigo-500 text-white hover:bg-indigo-400 self-end rounded">Ingresar</p-btn>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import PInput from '@/components/PInput.vue';
import PBtn from '@/components/PBtn.vue';

export default defineComponent({
  components: {
    PInput,
    PBtn,
  },
  setup() {
    const username = ref('');
    const password = ref(''); 

    return {
      username,
      password,
    }
  },
})
</script>

