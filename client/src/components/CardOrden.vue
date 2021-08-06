<template>
  <div class="border-gray-300 rounded px-2 border-2 py-2">
    <div class="flex justify-between">
      <div class="flex items-center">
        <div class="h-4 w-4 rounded-full" :class=[ordenEstado]></div>
        <span class="ml-2 font-medium text-gray-800">{{ razonSocial }}</span>
      </div>
      <div>
        <span class="text-gray-700 text-sm"
          >{{ despachado.toFixed(2) }} KG / {{ despachar.toFixed(2) }} KG</span
        >
      </div>
    </div>
    <div class="flex justify-between items-center mt-2">
      <span class="text-gray-600">{{ orden.numOrden }}</span>
      <p-btn class="bg-indigo-500 text-white text-sm rounded">Ver Orden</p-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Empresa } from '@/interfaces/Empresa';
import { Item } from '@/interfaces/Item';
import { OrdenServicio } from '@/interfaces/OrdenServicio';
import PBtn from '@/components/PBtn.vue';
import { computed, defineComponent, PropType } from 'vue';
import { Estado } from '@/types';

export default defineComponent({
  props: {
    orden: {
      type: Object as PropType<OrdenServicio>,
      required: true,
    },
  },
  components: {
    PBtn,
  },
  setup(props) {
    const { razonSocial } = props.orden.empresa as Empresa;
    const despachado = props.orden.items
      ? (props.orden.items as Item[]).reduce(
          (sum, item) => sum + item.totalDespachado,
          0
        )
      : 0;
    const despachar = props.orden.items
      ? (props.orden.items as Item[]).reduce(
          (sum, item) => sum + item.totalDespachar,
          0
        )
      : 0;

    const ordenEstado = computed(() => {
      switch(props.orden.estado) {
        case Estado.ACTIVO:
          return 'bg-green-500';
        case Estado.INACTIVO:
          return 'bg-yellow-500';
        case Estado.COMPLETADO:
          return 'bg-red-500';
        default:
          return 'bg-red-500';
      }
    });

    return {
      razonSocial,
      despachado,
      despachar,
      ordenEstado,
    };
  },
});
</script>
