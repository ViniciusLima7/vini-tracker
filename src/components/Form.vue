<template>
  <div class="box form">
    <div class="columns">
      <div
        class="column is-5"
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
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o Projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <Temporizador @temporizador-finalizado="finalizarTarefaData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
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
      idProjeto: "",
    };
  },
  methods: {
    /**
     * Após Finalizar a Tarefa pega a descrição e o tempo da mesma.
     *@description
     *24/07/2022 vlima Pega Dados da Tarefa
     *04/08/2022 vlima Adiciona nome do Projeto na lista de Tarefas
     */
    finalizarTarefaData(timeELapsed: number): void {
      this.$emit("aoAddTarefainList", {
        timeInSeconds: timeELapsed,
        description: this.descricaoTarefa,
        projeto: this.projetos.find((projeto) => projeto.id == this.idProjeto),
      });
      this.descricaoTarefa = "";
    },
  },
  setup() {
    const store = useStore(key);
    return {
      projetos: computed(() => store.state.project.projetos),
    };
  },
});
</script>

<style>
.form,
.input,
.input::placeholder {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>
