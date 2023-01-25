<template>
  <article v-if="isUserData">
    <h1>2. Choisis la date de ton premier cours (en fonction de ton groupe)</h1>
    <div class="class-chooser">
      <ClassChooser subject="AP4A" group="TP 1" :date1="new Date()" :date2="new Date()"></ClassChooser>
      <ClassChooser subject="SY43" group="TP 2" :date1="new Date()" :date2="new Date()"></ClassChooser>
      <ClassChooser subject="HM40" group="TP 1" :date1="new Date()" :date2="new Date()"></ClassChooser>
    </div>
    <SubmitButton text="J'ai fini pour de vrai ! 😅"></SubmitButton>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassChooser from './class_chooser_components/ClassChooser.vue'
import SubmitButton from './form_components/SubmitButton.vue'

export default defineComponent({
  name: 'FirstClassChooser',
  components: { ClassChooser, SubmitButton },
  props: {
    userData: null as unknown as Record<string, unknown>
  },
  computed: {
    isUserData (): boolean {
      return this.userData !== null
    }
  }
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
    gap: 1.5rem
  }

  h1 {
    margin-left: 4rem;
    align-self: flex-start;
  }

  .class-chooser {
    display: inline-flex;
    justify-content: space-around;
    gap: 1rem;
    flex-wrap: wrap;
  }
</style>
