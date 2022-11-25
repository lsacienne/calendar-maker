<template>
  <article class="class-chooser">
    <h1>{{subject}} - {{group}} ✏️</h1>
    <form action="">
      <div class="date-container">
        <input type="radio" :name="`date-chooser-${subject.toLowerCase()}`" id="date-1">
        <label for="date-1">{{convertFrDate(date1)}}</label>
      </div>
      <div class="date-container">
        <input type="radio" :name="`date-chooser-${subject.toLowerCase()}`" id="date-2">
        <label for="date-2">{{convertFrDate(date2)}}</label>
      </div>
    </form>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ClassChooser',
  props: {
    subject: {
      type: String,
      required: true
    },
    group: {
      type: String,
      required: true
    },
    date1: {
      type: Date,
      required: true
    },
    date2: {
      type: Date,
      required: true
    }
  },
  methods: {
    convertFrDate (date: Date): string {
      return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      })
    }
  }
})
</script>

<style scoped>

article.class-chooser {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

h1 {
  margin-top:0;
  margin-bottom: 0;
  font-size: 1.5rem;
  align-self: flex-start;
}
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.date-container {
  display: inline-flex;
  gap: 1rem;
}
</style>
