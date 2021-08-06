<template>
  <div class="grid grid-cols-1">
    <div class="flex justify-end">
      <p-btn class="bg-indigo-500 text-white rounded" icon="plus">Nuevo</p-btn>
    </div>
    <div class="mt-5">
      <template v-if="ordenes.length > 0">
        <card-orden
          v-for="orden in ordenes"
          :key="orden.id"
          :orden="orden"
        ></card-orden>
      </template>
      <div v-else class="text-center text-gray-700">
        <span>No hay Ordenes registradas</span>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import PBtn from '@/components/PBtn.vue';
import CardOrden from '@/components/CardOrden.vue';
import { Estado } from '@/types';
import { OrdenServicio } from '@/interfaces/OrdenServicio';

export default defineComponent({
  components: {
    PBtn,
    CardOrden,
  },
  setup() {
    const ordenes = ref<OrdenServicio[]>([
    ]);

    return {
      ordenes
    };
  },
})
</script>

