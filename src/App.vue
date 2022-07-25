<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <MenuLateral />
    </div>
    <div class="column is-three-quarter">
      <Form></Form>
      <div class="lista">
        <Tarefa />
        <Tarefa />
        <Tarefa />
        <Tarefa />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuLateral from "./components/MenuLateral.vue";
import Form from "./components/Form.vue";
import Tarefa from "./components/Tarefa.vue";

export default defineComponent({
  name: "App",
  components: { MenuLateral, Form, Tarefa },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
