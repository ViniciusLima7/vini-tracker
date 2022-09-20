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
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },

  setup(props) {
    const store = useStore();
    const { notificar } = useNotificador();
    const router = useRouter();

    const nomeDoProjeto = ref("");

    if (props.id) {
      const projeto = store.state.project.projetos.find(
        (proj) => proj.id == props.id
      );
      nomeDoProjeto.value = projeto?.name || "";
    }

    /**
     * Salva o Projeto digitado na Lista de Projetos e depois limpa o input
     *@description
     *02/08/2022 vlima Salvar Projeto
     */
    const salvar = () => {
      if (props.id) {
        store
          .dispatch(UPDATE_PROJECT, {
            id: props.id,
            name: nomeDoProjeto.value,
          })
          .then(() => isSuccess());
      } else {
        if (nomeDoProjeto.value == "") {
          isError();
          return;
        }
        store
          .dispatch(CREATE_PROJECT, nomeDoProjeto.value)
          .then(() => isSuccess());
      }
    };

    /**
     * Emita a Notificação de Sucesso e faz o push na Criação ou Alteração do Projeto
     *@description
     *06/09/2022 Lida com o Sucesso de uma alteração na Aplicação
     */
    const isSuccess = () => {
      nomeDoProjeto.value = "";
      notificar(
        TypeNotification.SUCESSO,
        "Excelente !",
        "Projeto cadastrado com Sucesso"
      );
      router.push("/projetos");
    };

    /**
     * Emita a Notificação de Falha
     *@description
     *06/09/2022 Lida com a Falha na Ação do User
     */
    const isError = () => {
      notificar(
        TypeNotification.FALHA,
        "Erro !",
        "Projeto não cadastrado! Digite um nome válido"
      );
    };

    return {
      nomeDoProjeto,
      salvar,
    };
  },
});
</script>

<style scoped>
.label {
  color: var(--text-primary);
}
</style>
