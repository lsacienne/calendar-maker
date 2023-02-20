<template>
  <div class="body-content">
    <AppTitle></AppTitle>
    <UserData @formValidated="getData"></UserData>
    <FirstClassChooser :userData="userData" @dateChosen="getDate"></FirstClassChooser>
    <CustomSchedule></CustomSchedule>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CustomSchedule from './components/CustomSchedule.vue'
import FirstClassChooser from './components/FirstClassChooser.vue'
import UserData from './components/UserData.vue'
import AppTitle from './components/AppTitle.vue'

export default defineComponent({
  name: 'App',
  components: {
    UserData,
    FirstClassChooser,
    CustomSchedule,
    AppTitle
  },
  data () {
    return {
      userData: null as Record<string, unknown> | null,
      dateSlots: null as Array<{
        id: number, uv: string,
        type: string,
        day: string,
        date1: Date | undefined,
        date2: Date | undefined,
        chosenDate: Date | number |undefined
      }> | null
    }
  },
  methods: {
    getData (content: {
        courses: {start: string, end: string},
        schedule: Array<object>,
        rests: Array<{start: string, end: string}>
      } | null
    ) {
      this.userData = content
    },
    getDate (content: Array<{
        id: number, uv: string,
        type: string,
        day: string,
        date1: Date | undefined,
        date2: Date | undefined,
        chosenDate: Date | number |undefined
      }> | null
    ) {
      console.log(content)
      this.dateSlots = content
    }
  }
})
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300&display=swap');

body {
  font-family:  'Jost', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
  font-weight: 100;
  background: linear-gradient(135deg, rgba(4,97,159,1) 0%, rgba(0,0,0,1) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.body-content {
  width: 50vw;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 1.5rem;
  padding: 1rem;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.c-toast.c-toast--default {
  font-family:  'Jost', Avenir, Helvetica, Arial, sans-serif;
  color: white;
  font-size: 1.4rem;
  padding: 2rem;
  padding-top: 0;
  padding-bottom: 0;
  background-color: rgb(0, 0, 0, 0.75);
  border-radius: 1rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
}

</style>
