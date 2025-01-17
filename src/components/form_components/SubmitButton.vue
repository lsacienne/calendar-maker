<template>
  <input
    type="submit"
    :value="text"
    id="end"
    ref="submit"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SubmitButton",
  props: {
    text: String,
  },
  methods: {
    handleClick(e: Event) {
      e.preventDefault();
    },
  },
});
</script>

<style scoped>
input[type="submit"] {
  color: inherit;
  align-self: center;
  padding: 0.5rem;
  font-size: 1.5rem;
  border-radius: 0.7rem;
  background-color: hsl(23, 88%, 70%);
  border: solid hsl(23, 58%, 34%) 0.2rem;
  transition: background-color 0.3s, color 0.2s, border 0.1s;
}

input[type="submit"]:hover {
  background-color: hsl(23, 58%, 34%);
  color: aliceblue;
}

input[type="submit"]:active {
  border: solid hsl(23, 20%, 70%) 0.2rem;
  background-color: hsl(23, 20%, 70%);
  color: aliceblue;
}
</style>
