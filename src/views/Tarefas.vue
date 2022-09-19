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
import { computed, defineComponent } from "vue";
import Form from "../components/Form.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import { TypeNotification } from "@/enums/TypeNotification";
import useNotificador from "../hooks/notificador";
import { GET_TASKS } from "@/store/type-actions";
import { useStore } from "@/store";

export default defineComponent({
  name: "Tarefas",
  components: { Form, Tarefa, Box },
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
    // addTarefainList(tarefa: ITarefa) {
    //   if (tarefa.projeto == undefined) {
    //     this.notificar(
    //       TypeNotification.ATENÇÃO,
    //       "Aviso !",
    //       "Para ter um melhor controle de seu tempo gasto, sempre vincule as tarefas aos seus projetos."
    //     );
    //   }
    //   this.tarefas.push(tarefa);
    // },
  },
  setup() {
    const { notificar } = useNotificador();
    const store = useStore();
    store.dispatch(GET_TASKS);

    return {
      tarefas: computed(() => store.state.tarefas),
      notificar,
    };
  },
});
</script>
