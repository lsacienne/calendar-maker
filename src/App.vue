<template>
  <body>
    <div class="body-content">
      <UserData></UserData>
    </div>
  </body>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserData from './components/UserData.vue'

export default defineComponent({
  name: 'App',
  components: {
    UserData
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
  backdrop-filter: blur(1rem);
  border-radius: 1.5rem;
  padding: 1rem;
  min-height: 50vh;
}
</style>
