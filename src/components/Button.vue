<template>
  <button class="button">
    <span class="icon">
      <i :class="iconButton"></i>
    </span>
    <span>{{ titleButton }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    titleButton: {
      type: String,
      required: true,
    },
    iconButton: {
      type: String,
      required: true,
    },
  },
});
</script>
