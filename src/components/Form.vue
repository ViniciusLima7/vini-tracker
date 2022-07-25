<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar"
          v-model="descricaoTarefa"
        />
      </div>

      <div class="column">
        <Temporizador @temporizador-finalizado="finalizarTarefaData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "Form",
  emits: ["aoAddTarefainList"],
  components: {
    Temporizador,
  },
  data() {
    return {
      descricaoTarefa: "",
    };
  },
  methods: {
    /**
     * Após Finalizar a Tarefa pega a descrição e o tempo da mesma.
     *@description
     *24/07/2022 vlima Pega Dados da Tarefa
     */
    finalizarTarefaData(timeELapsed: number): void {
      this.$emit("aoAddTarefainList", {
        timeInSeconds: timeELapsed,
        description: this.descricaoTarefa,
      });
      this.descricaoTarefa = "";
    },
  },
});
</script>
