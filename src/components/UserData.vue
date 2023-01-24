<template>
  <article>
    <h1>1. Coller votre emploi du temps</h1>
    <form action="">
      <textarea name="schedule-handler" id="schedule-handler" placeholder="Coller votre emploi du temps ici"></textarea>
      <div class="date-grid">
        <DateContainer title="Début des cours :">
          <DateField labeltext=""></DateField>
        </DateContainer>

        <DateContainer title="Date de fin des cours">
          <DateField labeltext=""></DateField>
        </DateContainer>

        <DateContainer title="Période de vacances 1 :">
          <DateField labeltext="Début :" ref="startRest1" v-on:dateChange="enableDate2()"></DateField>
          <DateField labeltext="Fin :" ref="endRest1" v-on:dateChange="enableDate2()"></DateField>
        </DateContainer>

        <DateContainer title="Période de vacances 2 :">
          <DateField labeltext="Début :" :disabled="true" ref="startRest2"></DateField>
          <DateField labeltext="Fin :" :disabled="true" ref="endRest2"></DateField>
        </DateContainer>
      </div>
      <SubmitButton text="J'ai fini 😎"></SubmitButton>
    </form>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DateContainer from './form_components/DateContainer.vue'
import DateField from './form_components/DateField.vue'
import SubmitButton from './form_components/SubmitButton.vue'
import { createToaster } from '@meforma/vue-toaster'

const toaster = createToaster()

export default defineComponent({
  name: 'UserData',
  components: { DateField, DateContainer, SubmitButton },
  methods: {
    enableDate2 () {
      console.log('activated')
      // const startRest1 = this.$refs.startRest1 as typeof DateField
      // const endRest1 = this.$refs.endRest1 as typeof DateField
      const startRest2 = this.$refs.startRest2 as typeof DateField
      const endRest2 = this.$refs.endRest2 as typeof DateField

      startRest2.enable()
      endRest2.enable()

      console.log(startRest2)
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
    }

    h1 {
      margin-left: 4rem;
      align-self: flex-start;
    }

    article form {
      display: flex;
      width: 80%;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    form textarea {
      border-radius: 1rem;
      width: 91%;
      height: 30vh;
      padding: 4%;
      resize: none;
      background-color: rgb(255, 255, 255);
      border: solid rgb(121, 121, 209) 0.2rem;
      /*border: solid rgb(252, 204, 12) 0.2rem;*/
    }

    .date-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      gap: 0.5rem;
      border-radius: 1rem;
      background-color: rgb(121, 121, 209,0.6);
    }
</style>
