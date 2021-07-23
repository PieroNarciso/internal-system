<template>
  <nav class="bg-indigo-500 text-white px-2 py-2 text-lg flex items-center">
    <button class="px-1 py-1 rounded-full" @click="toggleDrawer">
      <p-icon name="menu"></p-icon>
    </button>
    <router-link class="ml-2 font-medium" to="/">Texaf</router-link>
  </nav> 

  <div v-if="drawer" class="fixed h-full w-full flex">
    <div class="w-60 h-full bg-white flex-grow-0 flex flex-col">
    </div>
    <div @click="toggleDrawer" class="h-full bg-black opacity-30 right-0 flex-grow"></div>
  </div>

  <div class="container px-3 mx-auto pt-3">
    <router-view></router-view>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import PIcon from '@/components/PIcon.vue';

export default defineComponent({
  components: {
    PIcon,
  },
  setup() {
    const drawer = ref(false); 
    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };

    return {
      drawer,
      toggleDrawer,
    }
  },
})
</script>

