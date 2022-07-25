<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <MenuLateral />
    </div>
    <div class="column is-three-quarter">
      <Form @aoAddTarefainList="addTarefainList"></Form>
      <div class="lista">
        <Tarefa
          v-for="(tarefa, index) in tarefas"
          :key="index"
          :tarefa="tarefa"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuLateral from "./components/MenuLateral.vue";
import Form from "./components/Form.vue";
import Tarefa from "./components/Tarefa.vue";
import ITarefa from "./interfaces/ITarefa";

export default defineComponent({
  name: "App",
  components: { MenuLateral, Form, Tarefa },
  data() {
    return {
      tarefas: [] as ITarefa[],
    };
  },
  methods: {
    /**
     * Adiciona Tarefa  Digitada na Lista de Tarefas
     *@description
     *25/07/2022 vlima Adiciona Tarefa na Lista de Tarefas
     */
    addTarefainList(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
