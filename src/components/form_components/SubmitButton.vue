<template>
  <input type="submit" :value="text" id="end" ref="submit">
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SubmitButton',
  props: {
    text: String
  }
})
</script>

<style scoped>
input[type=submit] {
  color: inherit;
  align-self: center;
  padding: 0.5rem;
  font-size: 1.5rem;
  border-radius: 0.7rem;
  background-color: rgb(164, 139, 187);
  border: solid rgb(88, 36, 136) 0.2rem;
  transition: background-color 0.3s, color 0.2s, border 0.1s;
}

input[type=submit]:hover {
  background-color: rgb(88, 36, 136);
  color: aliceblue;
}

input[type=submit]:active {
  border: solid rgb(125, 110, 139) 0.2rem;
  background-color: rgb(125, 110, 139);
  color: aliceblue;
}
</style>
