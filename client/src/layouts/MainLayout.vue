<template>
  <q-layout>
    <q-header>
      <q-toolbar>
        <q-btn flat round dense @click="drawerShow = !drawerShow" icon="menu"/>
        <q-toolbar-title>Texaf</q-toolbar-title>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    <q-drawer v-model="drawerShow">
    </q-drawer>

  </q-layout> 

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const drawerShow = ref(false);

    return { drawerShow };
  }
})
</script>
