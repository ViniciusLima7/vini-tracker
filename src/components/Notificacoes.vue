<template>
  <div class="notificacoes">
    <article
      class="message"
      :class="contexto[notificacao.type]"
      v-for="notificacao in notificacoes"
      :key="notificacao.id"
    >
      <div class="message-header">{{ notificacao.title }}</div>
      <div class="message-body">{{ notificacao.text }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { TypeNotification } from "@/enums/TypeNotification";
import { computed, defineComponent } from "vue";
import { useStore } from "../store";

export default defineComponent({
  name: "Notificacoes",
  data() {
    return {
      contexto: {
        [TypeNotification.SUCESSO]: "is-success",
        [TypeNotification.ATENÇÃO]: "is-warning",
        [TypeNotification.FALHA]: "is-danger",
      },
    };
  },

  setup() {
    const store = useStore();
    return {
      notificacoes: computed(() => store.state.notificacoes),
    };
  },
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 100;
}
</style>
