<template>
  <Form @aoAddTarefainList="addTarefainList"></Form>
  <div class="lista">
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aotarefaClicked="selecionarTarefa"
    />
    <Box v-if="ListIsEmpty">
      Sem Tarefas iniciadas, adicione sua primeira tarefa do dia !
    </Box>
    <div
      class="modal"
      :class="{ 'is-active': tarefaSelecionada }"
      v-if="tarefaSelecionada"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editar Tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="field">
            <label for="descricaoDaTarefa" class="label">Descrição</label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.description"
              id="descricaoDaTarefa"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="alterarTarefa" class="button is-success">
            Salvar Alterações
          </button>
          <button class="button" @click="fecharModal">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Form from "../components/Form.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import { TypeNotification } from "@/enums/TypeNotification";
import useNotificador from "../hooks/notificador";
import {
  CREATE_TASK,
  GET_PROJECTS,
  GET_TASKS,
  UPDATE_TASK,
} from "@/store/type-actions";
import { useStore } from "@/store";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "Tarefas",
  components: { Form, Tarefa, Box },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
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
    addTarefainList(tarefa: ITarefa): void {
      if (tarefa.projeto == undefined) {
        this.notificar(
          TypeNotification.ATENÇÃO,
          "Aviso !",
          "Para ter um melhor controle de seu tempo gasto, sempre vincule as tarefas aos seus projetos."
        );
      }
      this.store.dispatch(CREATE_TASK, tarefa);
    },

    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },

    fecharModal() {
      this.tarefaSelecionada = null;
    },

    alterarTarefa() {
      this.store
        .dispatch(UPDATE_TASK, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },
  setup() {
    const { notificar } = useNotificador();
    const store = useStore();
    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);

    return {
      tarefas: computed(() => store.state.tarefas),
      store,
      notificar,
    };
  },
});
</script>
