<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <MenuLateral />
    </div>
    <div class="column is-three-quarter">
      <Form></Form>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuLateral from "./components/MenuLateral.vue";
import Form from "./components/Form.vue";

export default defineComponent({
  name: "App",
  components: { MenuLateral, Form },
});
</script>

<style></style>
