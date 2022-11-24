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

              <DateContainer title="Période des vacances 1 :">
                  <DateField labeltext="Début :"></DateField>
                  <DateField labeltext="Fin :"></DateField>
              </DateContainer>

              <DateContainer title="Période des vacances 2 :">
                  <DateField  labeltext="Début :" :disabled="true"></DateField>
                  <DateField labeltext="Fin :" :disabled="true"></DateField>
              </DateContainer>
            </div>

            <input type="submit" value="J'ai fini 😎" id="end" ref="submit">
        </form>
    </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DateContainer from './from_components/DateContainer.vue'
import DateField from './from_components/DateField.vue'

export default defineComponent({
  name: 'UserData',
  components: { DateField, DateContainer }
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
      border-radius: 0.8rem;
      width: 85%;
      height: 30vh;
      padding: 1rem;
      resize: none;
      border: solid rgb(121, 121, 209) 0.2rem;
      /*border: solid rgb(252, 204, 12) 0.2rem;*/
    }

    .date-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      gap: 0.5rem;
    }

    input[type=submit] {
      color: inherit;
      align-self: center;
      padding: 0.5rem;
      font-size: 1.5rem;
      border-radius: 0.7rem;
      background-color: rgb(164, 139, 187);
      border: solid rgb(88, 36, 136) 0.2rem;
      transition: background-color 0.3s, color 0.2s, border 0.1s;
    }

    input[type=submit]:hover {
      background-color: rgb(88, 36, 136);
      color: aliceblue;
    }

    input[type=submit]:active {
      border: solid rgb(125, 110, 139) 0.2rem;
      background-color: rgb(125, 110, 139);
      color: aliceblue;
    }
</style>
