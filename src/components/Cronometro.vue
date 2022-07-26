<template>
  <section>
    <strong class="display">
      {{ timeELapsed }}
    </strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Cronometro",
  props: {
    timeInSeconds: {
      type: Number,
      default: 0,
    },
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
});
</script>

<style>
.display {
  color: var(--text-primary);
}
</style>
