<template>
    <div class="date-item">
        <label for="date_debut">{{labeltext}}</label>
        <input type="date" name="date_debut" id="date_debut_cours">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DateField',
  data () {
    return {
      test: String
    }
  },
  props: {
    labeltext: String
  }
})
</script>

<style scoped>
  .date-item {
    display: inline-flex;
    width: 60%;
    justify-content: space-between;
  }

  .date-item label {
    font-size: 1.1rem;
    font-weight: bold;
  }

  .date-item label::before {
    content: "📅";
    margin-right: 0.5rem;
  }
</style>
