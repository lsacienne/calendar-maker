<template>
  <article class="class-chooser">
    <h1>📌 {{ subject }} - {{ group }}</h1>
    <h2>Semaine</h2>
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
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VBtn } from "vuetify/lib/components/index.mjs";

export default defineComponent({
  name: "ClassChooser",
  components: {
    VBtn,
  },
  props: {
    subject: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
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
    convertFrDate(date: Date): string {
      return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
    },
    selectDate(week: "A" | "B") {
      this.$emit(`date${week}Change`);
      this.selectedDate = week;
    },
  },
});
</script>

<style scoped>
article.class-chooser {
  padding-top: 1em;
  padding-bottom: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  background-color: whitesmoke;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.week-button {
  transition: color 0.3s, background-color 0.3s;
}

h1 {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.2rem;
}
h2 {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.2em;
  font-weight: normal;
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
