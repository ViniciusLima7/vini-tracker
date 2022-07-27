<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Box",
});
</script>

<style scoped>
.box {
  background: #add8e6;
}
</style>
