<template>
  <body>
    <div class="body-content">
      <UserData @formValidated="getData"></UserData>
      <FirstClassChooser></FirstClassChooser>
      <CustomSchedule></CustomSchedule>
    </div>
  </body>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CustomSchedule from './components/CustomSchedule.vue'
import FirstClassChooser from './components/FirstClassChooser.vue'
import UserData from './components/UserData.vue'

export default defineComponent({
  name: 'App',
  components: {
    UserData,
    FirstClassChooser,
    CustomSchedule
  },
  data () {
    return {
      userData: null as unknown as Record<string, unknown> | null
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
    }
  }
})
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(46, 46, 116);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.body-content {
  width: 50vw;
  background-color: rgba(240, 248, 255,0.8);
  border-radius: 1.5rem;
  padding: 1rem;
  min-height: 50vh;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.c-toast.c-toast--default {
  color: white;
  font-size: 1.4rem;
  padding: 2rem;
  padding-top: 0;
  padding-bottom: 0;
  border: solid 3px rgb(114, 75, 255);
  background-color: rgb(139, 107, 255);
  border-radius: 1rem;
  transition: all .2s;
}
</style>
