<template>
  <Form @aoAddTarefainList="addTarefainList"></Form>
  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    <Box v-if="ListIsEmpty">
      Sem Tarefas iniciadas, adicione sua primeira tarefa do dia !
    </Box>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Form from "../components/Form.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import ITarefa from "../interfaces/ITarefa";

export default defineComponent({
  name: "App",
  components: { Form, Tarefa, Box },
  data() {
    return {
      tarefas: [] as ITarefa[],
    };
  },
  computed: {
    /**
     * Verifica se Lista está vazia
     *@description
     *25/07/2022 vlima Verifica Lista Vazia
     */
    ListIsEmpty(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    /**
     * Faz o push das Tarefas na Lista de Tarefas
     *@description
     *25/07/2022 vlima Adiciona Tarefa na Lista de Tarefas
     */
    addTarefainList(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
  },
});
</script>
