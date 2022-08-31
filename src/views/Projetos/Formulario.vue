<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { usageStore } from "@/store";

export default defineComponent({
  name: "Formulario",
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  methods: {
    /**
     * Salva o Projeto digitado na Lista de Projetos e depois limpa o input
     *@description
     *02/08/2022 vlima Salvar Projeto
     */
    salvar() {
      this.store.commit("ADD_PROJECT", this.nomeDoProjeto);
      this.nomeDoProjeto = "";
      this.$router.push("/projetos");
    },
  },
  setup() {
    const store = usageStore();
    return {
      store,
      projetos: computed(() => store.state.projetos),
    };
  },
});
</script>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>
