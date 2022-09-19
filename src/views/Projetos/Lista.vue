<template>
  <section>
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo Projeto</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.name }}</td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";
import { TypeNotification } from "@/enums/TypeNotification";
import useNotificador from "../../hooks/notificador";
import { GET_PROJECTS, REMOVE_PROJECT } from "@/store/type-actions";

export default defineComponent({
  name: "Projetos",
  methods: {
    excluir(id: string) {
      this.store.dispatch(REMOVE_PROJECT, id);
      this.notificar(
        TypeNotification.SUCESSO,
        "Excelente !",
        "Projeto Excluido com Sucesso"
      );
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    store.dispatch(GET_PROJECTS);

    return {
      projetos: computed(() => store.state.project.projetos),
      store,
      notificar,
    };
  },
});
</script>

<style scoped>
table,
th {
  color: var(--text-primary) !important;
  background-color: var(--bg-primary);
}
</style>
