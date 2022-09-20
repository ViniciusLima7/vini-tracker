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
            <option value="" disabled selected>Selecione o Projeto</option>
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
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "Form",
  emits: ["aoAddTarefainList"],
  components: {
    Temporizador,
  },
  setup(props, { emit }) {
    const store = useStore(key);

    const descricaoTarefa = ref("");
    const idProjeto = ref("");
    const projetos = computed(() => store.state.project.projetos);

    /**
     * Após Finalizar a Tarefa pega a descrição e o tempo da mesma.
     *@description
     *24/07/2022 vlima Pega Dados da Tarefa
     *04/08/2022 vlima Adiciona nome do Projeto na lista de Tarefas
     */
    const finalizarTarefaData = (timeELapsed: number): void => {
      emit("aoAddTarefainList", {
        timeInSeconds: timeELapsed,
        description: descricaoTarefa.value,
        projeto: projetos.value.find(
          (projeto) => projeto.id == idProjeto.value
        ),
      });
      descricaoTarefa.value = "";
    };

    return {
      projetos,
      descricaoTarefa,
      idProjeto,
      finalizarTarefaData,
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
