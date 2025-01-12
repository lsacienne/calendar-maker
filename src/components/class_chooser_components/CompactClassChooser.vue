<template>
  <div class="date-container">
    <v-btn
      class="week-button"
      rounded="xl"
      :color="selectedDate === 'A' ? 'orange-darken-3' : 'orange-lighten-4'"
      density="comfortable"
      @click="selectDate('A')"
      >A</v-btn
    >
    <p>ou</p>
    <v-btn
      class="week-button"
      rounded="xl"
      :color="selectedDate === 'B' ? 'orange-darken-3' : 'orange-lighten-4'"
      density="comfortable"
      @click="selectDate('B')"
      >B</v-btn
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VBtn } from "vuetify/lib/components/index.mjs";

export default defineComponent({
  name: "CompactClassChooser",
  components: {
    VBtn,
  },
  props: {
    initialDate: {
      type: String,
      required: false,
      validator: (value: string) => ["A", "B", undefined].includes(value),
    },
  },
  data() {
    return {
      selectedDate: undefined as "A" | "B" | undefined,
    };
  },
  mounted() {
    this.selectedDate = this.initialDate as "A" | "B" | undefined;
    if (this.selectedDate !== undefined) {
      this.selectDate(this.selectedDate);
    }
  },
  methods: {
    selectDate(week: "A" | "B") {
      this.$emit(`date${week}Change`);
      this.selectedDate = week;
    },
  },
});
</script>

<style scoped>
.week-button {
  transition: color 0.3s, background-color 0.3s;
}

.date-container {
  display: inline-flex;
  gap: 1rem;
}
</style>
