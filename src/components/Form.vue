<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar"
        />
      </div>

      <div class="column">
        <div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <Cronometro :timeInSeconds="timeInSeconds" />

          <button class="button" @click="iniciar">
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
            <span>Start</span>
          </button>

          <button class="button" @click="finalizar">
            <span class="icon">
              <i class="fas fa-stop"></i>
            </span>
            <span>Fim</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";

export default defineComponent({
  name: "Formulario",
  components: {
    Cronometro,
  },
  data() {
    return {
      timeInSeconds: 0,
      cronometro: 0,
    };
  },
  methods: {
    /**
     * Inicia o contador em segundos
     *@description
     *10/07/2022 vlima Inicia Contador e guarda a referencia na variavel cronometro
     */
    iniciar() {
      //Começar a Contar
      this.cronometro = setInterval(() => {
        this.timeInSeconds++;
      }, 1000);
    },
    /**
     * Finaliza o contador em segundos
     *@description
     *10/07/2022 vlima Finaliza Contador
     */
    finalizar() {
      clearInterval(this.cronometro);
    },
  },
});
</script>
