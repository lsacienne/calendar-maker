<template>
    <article>
        <h1>2. Choisis la date de ton premier cours (en fonction de ton groupe)</h1>
    </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FirstClassChooser'
})
</script>
<style scoped>
  article {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 216, 59, 0.5);
    padding: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 1rem;
  }

  h1 {
    margin-left: 4rem;
    align-self: flex-start;
  }
</style>
