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
import { defineComponent, ref } from "vue";
import { useStore } from "../../store";
import { TypeNotification } from "@/enums/TypeNotification";
import useNotificador from "../../hooks/notificador";
import { CREATE_PROJECT, UPDATE_PROJECT } from "@/store/type-actions";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },

  methods: {
    /**
     * Salva o Projeto digitado na Lista de Projetos e depois limpa o input
     *@description
     *02/08/2022 vlima Salvar Projeto
     */
    salvar() {
      if (this.id) {
        this.store
          .dispatch(UPDATE_PROJECT, {
            id: this.id,
            name: this.nomeDoProjeto,
          })
          .then(() => this.isSuccess());
      } else {
        if (this.nomeDoProjeto == "") {
          this.isError();
          return;
        }
        this.store
          .dispatch(CREATE_PROJECT, this.nomeDoProjeto)
          .then(() => this.isSuccess());
      }
    },

    /**
     * Emita a Notificação de Sucesso e faz o push na Criação ou Alteração do Projeto
     *@description
     *06/09/2022 Lida com o Sucesso de uma alteração na Aplicação
     */
    isSuccess() {
      this.nomeDoProjeto = "";
      this.notificar(
        TypeNotification.SUCESSO,
        "Excelente !",
        "Projeto cadastrado com Sucesso"
      );
      this.$router.push("/projetos");
    },

    /**
     * Emita a Notificação de Falha
     *@description
     *06/09/2022 Lida com a Falha na Ação do User
     */
    isError() {
      this.notificar(
        TypeNotification.FALHA,
        "Erro !",
        "Projeto não cadastrado! Digite um nome válido"
      );
    },
  },

  setup(props) {
    const store = useStore();
    const { notificar } = useNotificador();
    const nomeDoProjeto = ref("");

    if (props.id) {
      const projeto = store.state.project.projetos.find(
        (proj) => proj.id == props.id
      );
      nomeDoProjeto.value = projeto?.name || "";
    }

    return {
      store,
      notificar,
      nomeDoProjeto,
    };
  },
});
</script>
