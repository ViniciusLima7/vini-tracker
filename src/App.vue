<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter">
      <MenuLateral @aoTemaAlterado="toggleTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Form @aoAddTarefainList="addTarefainList"></Form>
      <div class="lista">
        <Tarefa
          v-for="(tarefa, index) in tarefas"
          :key="index"
          :tarefa="tarefa"
        />
        <Box v-if="ListIsEmpty">
          Sem Tarefas iniciadas, adicione sua primeira tarefa do dia !
        </Box>
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
import Box from "./components/Box.vue";

export default defineComponent({
  name: "App",
  components: { MenuLateral, Form, Tarefa, Box },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false,
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

    /**
     * Altera o Estado do toggle Tema ao Clique do User no Botão
     *@description
     *26/07/2022 vlima toggle Tema
     */
    toggleTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primary: #fff;
  --bg-header: #727272;
  --text-primary: #000;
}

main.modo-escuro {
  --bg-primary: #000000;
  --text-primary: #ddd;
  --bg-header: #262626;
}

.conteudo {
  background-color: var(--bg-primary);
}
</style>
