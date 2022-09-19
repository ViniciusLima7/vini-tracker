<template>
  <Box>
    <div class="columns cursor" @click="tarefaClicked">
      <div class="column is-4">
        <h3>Descrição</h3>
        {{ tarefa.description || "Tarefa sem Descrição" }}
      </div>
      <div class="column is-3">
        <h3>Projeto</h3>
        {{ tarefa.projeto?.name || "N/D" }}
      </div>
      <div class="column">
        <h3>Tempo Gasto</h3>
        <Cronometro :timeInSeconds="tarefa.timeInSeconds" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import ITarefa from "../interfaces/ITarefa";
import { defineComponent, PropType } from "vue";
import Cronometro from "./Cronometro.vue";
import Box from "./Box.vue";

export default defineComponent({
  name: "Tarefa",
  emits: ["aotarefaClicked"],
  components: { Cronometro, Box },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },

  methods: {
    /**
     * Tarefa Clicada
     *@description
     *19/09/20/22 vlima Faz a emissão do evento ao clicar em qualquer parte da tarefa
     */
    tarefaClicked(): void {
      this.$emit("aotarefaClicked", this.tarefa);
    },
  },
});
</script>

<style scoped>
h3 {
  font-weight: bold;
}

.cursor {
  cursor: pointer;
}
</style>
