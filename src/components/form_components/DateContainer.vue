<template>
    <div class="date">
        <h2>{{ title }}</h2>
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DataContainer',
  props: {
    title: String
  }
})
</script>

<style scoped>
.date {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    padding: 1rem;
}

h2 {
    font-size: 1.2rem;
    margin-bottom: 0;
    margin-top: 0;
    align-self: flex-start;
}

h2::before {
    content: "📅";
    margin-right: 0.5rem;
}
</style>
