<template>
    <article>
        <form action="">
            <h1>1. Coller votre emploi du temps</h1>
            <textarea name="schedule-handler" id="schedule-handler" placeholder="Coller votre emploi du temps ici"></textarea>
            <div class="date">
                <DateField labeltext="Date du début des cours :"></DateField>
            </div>

            <div class="date">
                <DateField labeltext="Début période de vacances 1 :"></DateField>
                <DateField labeltext="Fin de période de vacances 1 :"></DateField>
            </div>

            <div class="date">
                <DateField labeltext="Début période de vacances 2 :"></DateField>
                <DateField labeltext="Fin de période de vacances 2 :"></DateField>
            </div>

            <div class="date">
                <DateField labeltext="Date de la fin des cours :"></DateField>
            </div>

            <input type="submit" value="J'ai fini 😎" id="end">
        </form>
    </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DateField from './from_components/DateField.vue'

export default defineComponent({
  name: 'UserData',
  components: { DateField }
})
</script>

<style scoped>
    article {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: rgba(255, 243, 193, 0.5);
      padding: 1.5rem;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      border-radius: 1rem;
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
      width: 95%;
      height: 30vh;
      padding: 1rem;
      resize: none;
      border: solid rgb(121, 121, 209) 0.2rem;
      /*border: solid rgb(252, 204, 12) 0.2rem;*/
    }

    .date {
      display: flex;
      flex-direction: column;
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
