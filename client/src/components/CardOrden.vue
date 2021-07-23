<template>
  <div></div> 
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    empresa: {
      type: String,
      required: true,
    },
    estado: {
     type: String,
      required: true,
    },
    numOrden: {
      type: String,
      required: true,
    },
    despachado: {
      type: Number,
      required: true,
    },
    despachar: {
      type: Number,
      required: true,
    }
  },
  setup() {
    
  },
})
</script>

