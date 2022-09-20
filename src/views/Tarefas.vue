<template>
  <Form @aoAddTarefainList="addTarefainList"></Form>
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="Pesquisar Tarefas"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Box v-if="ListIsEmpty">
      Sem Tarefas iniciadas, adicione sua primeira tarefa do dia !
    </Box>
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aotarefaClicked="selecionarTarefa"
    />
    <Modal :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho class="modal-card-head">
        <p class="modal-card-title">Editar Tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </template>
      <template v-slot:conteudo class="modal-card-body">
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
      </template>
      <template v-slot:rodape class="modal-card-foot">
        <button @click="alterarTarefa" class="button is-success">
          Salvar Alterações
        </button>
        <button class="button" @click="fecharModal">Cancelar</button>
        <button @click="excluirTarefa" class="button is-danger">
          Excluir Tarefa
        </button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import Form from "../components/Form.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import Modal from "../components/Modal.vue";
import { TypeNotification } from "@/enums/TypeNotification";
import useNotificador from "../hooks/notificador";
import {
  CREATE_TASK,
  GET_PROJECTS,
  GET_TASKS,
  REMOVE_TASK,
  UPDATE_TASK,
} from "@/store/type-actions";
import { useStore } from "@/store";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "Tarefas",
  components: { Form, Tarefa, Box, Modal },
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

    /**
     * Seleciona a tarefa
     *@description
     *19/09/20/22 vlima Faz a Seleção da tarefa que o cliente  clicou
     */
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },

    /**
     * Fecha a Modal
     *@description
     *19/09/20/22 vlima Fecha a Modal da edição de tarefa
     */
    fecharModal() {
      this.tarefaSelecionada = null;
    },

    /**
     * Altera Tarefa
     *@description
     *19/09/20/22 vlima Faz update na tarefa Selecionada
     */
    alterarTarefa() {
      this.store
        .dispatch(UPDATE_TASK, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },

    /**
     * Deleta Tarefa
     *@description
     *20/09/20/22 vlima Faz a exclusão da Tarefa selecionada
     */
    excluirTarefa() {
      this.store
        .dispatch(REMOVE_TASK, this.tarefaSelecionada?.id)
        .then(() => this.fecharModal());
    },
  },

  setup() {
    const { notificar } = useNotificador();
    const store = useStore();
    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);

    const filtro = ref("");

    /**
     * Filtra Tarefa
     *@description
     *19/09/20/22 vlima Faz filtro nas tarefas
     */
    watchEffect(() => {
      store.dispatch(GET_TASKS, filtro.value);
    });

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      notificar,
      filtro,
    };
  },
});
</script>

<style scoped>
.label {
  color: var(--text-primary);
}
</style>
