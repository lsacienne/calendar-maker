<template>
    <div class="date-item">
        <label for="date_debut">{{labeltext}}</label>

        <input v-if="isDisabled" type="date" name="date_debut" id="date_debut_cours" v-on:change="$emit('dateChange')" disabled>
        <input v-else type="date" name="date_debut" id="date_debut_cours" v-on:change="$emit('dateChange')">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DateField',
  data () {
    return {
      disabled_: Boolean.prototype,
      min_: new Date() as Date,
      value_: '' as string
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
    disabled: Boolean,
    min: {
      type: Date,
      default: null
    }
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
