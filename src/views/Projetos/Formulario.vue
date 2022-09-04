<template>
  <section>
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
import { useStore } from "../../store";
import { ADD_PROJECT, EDIT_PROJECT } from "@/store/type-mutations";
import { TypeNotification } from "@/enums/TypeNotification";
import { notificacaoMixin } from "../../mixins/notificar";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  mixins: [notificacaoMixin],
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (proj) => proj.id === this.id
      );
      this.nomeDoProjeto = projeto?.name || "";
    }
  },
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
      if (this.id) {
        this.store.commit(EDIT_PROJECT, {
          id: this.id,
          name: this.nomeDoProjeto,
        });
      } else {
        this.store.commit(ADD_PROJECT, this.nomeDoProjeto);
      }

      this.nomeDoProjeto = "";
      this.notificar(
        TypeNotification.SUCESSO,
        "Excelente !",
        "Projeto cadastrado com Sucesso"
      );
      this.$router.push("/projetos");
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
      projetos: computed(() => store.state.projetos),
    };
  },
});
</script>
