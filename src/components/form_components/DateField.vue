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
      this.disabled_ = true
    } else {
      this.disabled_ = false
    }
    if (this.min !== null) {
      this.min_ = this.min
    } else {
      this.min_ = new Date(0)
    }
  },
  computed: {
    minDateStr () {
      const isoString: string = this.min_.toISOString()
      return isoString.substring(0, isoString.indexOf('T'))
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
      this.disabled_ = true
    },
    enable () {
      this.disabled_ = false
    },
    setMin (date: Date) {
      this.min_ = date
    },
    getValue () {
      return this.value_
    },
    setValue (date: Date) {
      const isoString: string = date.toISOString()
      this.value_ = isoString.substring(0, isoString.indexOf('T'))
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
