<template>
  <header>
    <h1>
      <img src="../assets/vini-trackerlogov2.png" alt="Logo do Vini Tracker" />
    </h1>
    <button class="button" @click="toggleTema">
      <img class="theme" src="../assets/themeOn.svg" alt="" />
      {{ textButton }}
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuLateral",
  emits: ["aoTemaAlterado"],
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  computed: {
    /**
     * Exibe Texto no Botão de Acordo com o Estado do Botão
     *@description
     *26/07/2022 vlima Exibir Texto no Botão
     */
    textButton() {
      if (this.modoEscuroAtivo) {
        return "Desativar modo Escuro";
      }
      return "Ativar modo Escuro";
    },
  },
  methods: {
    /**
     * Inverte o Estado do Botão ao Clique do Usere passa  como emit
     *@description
     *26/07/2022 vlima Toggle Tema
     */
    toggleTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo;
      this.$emit("aoTemaAlterado", this.modoEscuroAtivo);
    },
  },
});
</script>

<style scoped>
header {
  padding: 1rem;
  background: var(--bg-header);
  width: 100%;
  height: 100vh;
  text-align: center;
}

.button {
  color: var(--text-primary);
  background-color: transparent;
  border: transparent;
}

.theme {
  padding-bottom: 5px;
  height: 35px;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
