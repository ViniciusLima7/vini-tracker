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
          <section>
            <strong>
              {{ timeELapsed }}
            </strong>
          </section>

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

export default defineComponent({
  name: "Formulario",
  data() {
    return {
      timeInSeconds: 0,
    };
  },
  computed: {
    /**
     * Retorna um contador, no formato, Hora,Minuto, Segundo
     *@description
     *10/07/2022 vlima Adiciona Tempo Decorrido
     */
    timeELapsed(): string {
      return new Date(this.timeInSeconds * 1000).toISOString().substr(11, 8);
    },
  },
  methods: {
    /**
     * Inicia o contador em segundos
     *@description
     *10/07/2022 vlima Inicia Contador
     */
    iniciar() {
      //Começar a Contar
      setInterval(() => {
        this.timeInSeconds++;
      }, 1000);
    },
    /**
     * Finaliza o contador em segundos
     *@description
     *10/07/2022 vlima Inicia Contador
     */
    finalizar() {
      console.log("Finalizando");
    },
  },
});
</script>
