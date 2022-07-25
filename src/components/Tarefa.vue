<template>
  <Box>
    <div class="columns">
      <div class="column is-7">
        {{ tarefa.description || "Tarefa sem Descrição" }}
      </div>
      <div class="column">
        <Cronometro :timeInSeconds="tarefa.timeInSeconds" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import ITarefa from "../interfaces/ITarefa";
import { defineComponent, PropType } from "vue";
import Cronometro from "./Cronometro.vue";
import Box from "./Box.vue";

export default defineComponent({
  name: "Tarefa",
  components: { Cronometro, Box },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
});
</script>
