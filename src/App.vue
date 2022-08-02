<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter">
      <MenuLateral @aoTemaAlterado="toggleTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <!-- Visualização de Acordo com a Rota -->
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuLateral from "./components/MenuLateral.vue";

export default defineComponent({
  name: "App",
  components: { MenuLateral },
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  methods: {
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
