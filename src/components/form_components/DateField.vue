<template>
    <div class="date-item">
        <label for="date_debut">{{labeltext}}</label>

        <input v-if="disabled" type="date" name="date_debut" id="date_debut_cours" disabled>
        <input v-else type="date" name="date_debut" id="date_debut_cours">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DateField',
  data () {
    return {
      isDisabled: Boolean.prototype
    }
  },
  mounted () {
    if (this.disabled) {
      this.isDisabled = true
    } else {
      this.isDisabled = false
    }
  },
  props: {
    labeltext: String,
    disabled: Boolean
  },
  methods: {
    disable () {
      this.isDisabled = true
    },
    enable () {
      this.isDisabled = false
    }
  }
})
</script>

<style scoped>
  .date-item {
    display: inline-flex;
    flex-wrap: wrap;
    width: 70%;
    justify-content: space-between;
  }

  .date-item label {
    font-size: 1.1rem;
    font-weight: bold;
  }
</style>
