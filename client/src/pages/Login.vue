<template>
  <div>
    <q-card>
      <q-form @submit.prevent="submitForm">
        <q-card-section class="q-gutter-y-md">
          <q-input label="Usuario" outlined v-model="username" />
          <q-input label="Contraseña" outlined  v-model="password" />
        </q-card-section>
        <q-card-actions class="row justify-end">
          <q-btn class="col-auto" type="submit" label="Ingresar" color="primary" unelevated />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const username = ref('');
    const password = ref('');

    const submitForm = () => {
      console.log(username.value, password.value);
    }


    return {
      username,
      password,
      submitForm,
    }
  },
});
</script>
