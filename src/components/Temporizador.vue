<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :timeInSeconds="timeInSeconds" />

    <Button
      @click="iniciar"
      :disabled="cronometroRodando"
      titleButton="Start"
      iconButton="fas fa-play"
    />
    <Button
      @click="finalizar"
      :disabled="!cronometroRodando"
      titleButton="Stop"
      iconButton="fas fa-stop"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
import Button from "./Button.vue";

export default defineComponent({
  name: "Temporizador",
  emits: ["temporizadorFinalizado"],
  components: {
    Cronometro,
    Button,
  },
  data() {
    return {
      timeInSeconds: 0,
      cronometro: 0,
      cronometroRodando: false,
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
      this.cronometroRodando = true;
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
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("temporizadorFinalizado", this.timeInSeconds);
      this.timeInSeconds = 0;
    },
  },
});
</script>
