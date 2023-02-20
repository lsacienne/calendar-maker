<template>
  <article>
    <h1>Colle ton emploi du temps ici mon BG</h1>
    <form action="">
      <textarea name="schedule-handler" ref="scheduleArea" id="schedule-handler" placeholder="Coller votre emploi du temps ici"></textarea>
      <div class="date-grid">
        <DateContainer title="Début des cours :">
          <DateField labeltext="" ref="startCourses" v-on:dateChange="handleCoursesStart()"></DateField>
        </DateContainer>

        <DateContainer title="Date de fin des cours">
          <DateField labeltext="" :disabled="true" ref="endCourses"></DateField>
        </DateContainer>

        <DateContainer title="Période de vacances 1 :">
          <DateField labeltext="Début :" :disabled="true" ref="startRest1" v-on:dateChange="handleStart1()"></DateField>
          <DateField labeltext="Fin :" :disabled="true" ref="endRest1" v-on:dateChange="handleEnd1()"></DateField>
        </DateContainer>

        <DateContainer title="Période de vacances 2 :">
          <DateField labeltext="Début :" :disabled="true" ref="startRest2" v-on:dateChange="handleStart2()"></DateField>
          <DateField labeltext="Fin :" :disabled="true" ref="endRest2"></DateField>
        </DateContainer>
      </div>
      <SubmitButton text="J'ai fini 😎" v-on:click="sendData"></SubmitButton>
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
    handleCoursesStart () {
      const startCourses = this.$refs.startCourses as typeof DateField
      const endCourses = this.$refs.endCourses as typeof DateField
      const startRest1 = this.$refs.startRest1 as typeof DateField
      const endRest1 = this.$refs.endRest1 as typeof DateField

      let endCoursesMin = new Date(startCourses.getValue()) as Date
      endCoursesMin = this.addDay(endCoursesMin, 1)

      let startRest1Min = new Date(startCourses.getValue()) as Date
      startRest1Min = this.addDay(startRest1Min, 1)

      let endRest1Min = new Date(startCourses.getValue()) as Date
      endRest1Min = this.addDay(endRest1Min, 7)

      endCourses.setMin(endCoursesMin)
      startRest1.setMin(startRest1Min)
      endRest1.setMin(endRest1Min)

      endCourses.enable()
      startRest1.enable()
      endRest1.enable()
    },
    handleStart1 () {
      const startRest1 = this.$refs.startRest1 as typeof DateField
      const endRest1 = this.$refs.endRest1 as typeof DateField
      let endRestMinDate = new Date(startRest1.getValue()) as Date
      endRestMinDate = this.addDay(endRestMinDate, 6)
      endRest1.setMin(endRestMinDate)
      endRest1.setValue(endRestMinDate)
      this.enableDate2()
    },
    handleEnd1 () {
      const startRest1 = this.$refs.startRest1 as typeof DateField
      const endRest1 = this.$refs.endRest1 as typeof DateField
      let startNewDate = new Date(endRest1.getValue()) as Date
      startNewDate = this.addDay(startNewDate, -6)
      startRest1.setValue(startNewDate)
      this.enableDate2()
    },
    handleStart2 () {
      const startRest2 = this.$refs.startRest1 as typeof DateField
      const endRest2 = this.$refs.endRest1 as typeof DateField
      let endRestMinDate = new Date(startRest2.getValue()) as Date
      endRestMinDate = this.addDay(endRestMinDate, 6)
      endRest2.setMin(endRestMinDate)
      endRest2.setValue(endRestMinDate)
    },
    enableDate2 () {
      const endRest1 = this.$refs.endRest1 as typeof DateField
      const startRest2 = this.$refs.startRest2 as typeof DateField
      const endRest2 = this.$refs.endRest2 as typeof DateField

      let startRest2Min = new Date(endRest1.getValue()) as Date
      let endRest2Min = new Date(endRest1.getValue()) as Date
      startRest2Min = this.addDay(startRest2Min, 1)
      endRest2Min = this.addDay(endRest2Min, 7)

      startRest2.setMin(startRest2Min)
      endRest2.setMin(endRest2Min)

      startRest2.enable()
      endRest2.enable()
    },
    addDay (date: Date, days: number): Date {
      const resultDate = new Date(date)
      resultDate.setDate(resultDate.getDate() + days)
      return resultDate
    },
    sendData (): {
      courses: {start: string, end: string},
      schedule: Array<object>,
      rests: Array<{start: string, end: string}>
      } | null {
      const scheduleArea = this.$refs.scheduleArea as HTMLTextAreaElement
      const startCourses = this.$refs.startCourses as typeof DateField
      const endCourses = this.$refs.endCourses as typeof DateField
      const startRest1 = this.$refs.startRest1 as typeof DateField
      const endRest1 = this.$refs.endRest1 as typeof DateField
      const startRest2 = this.$refs.startRest2 as typeof DateField
      const endRest2 = this.$refs.endRest2 as typeof DateField

      const courses = {
        start: startCourses.getValue(),
        end: endCourses.getValue()
      }
      const rest1 = {
        start: startRest1.getValue(),
        end: endRest1.getValue()
      }
      const rest2 = {
        start: startRest2.getValue(),
        end: endRest2.getValue()
      }

      const scheduleStr = scheduleArea.value
      const schedule = scheduleStr.split('\n').map(line => line.split(/\t+/)) as Array<Array<string>>
      const scheduleTable = []

      for (const line of schedule) {
        let mode = '' as string
        let classroom = '' as string
        if (line.length > 7) {
          classroom = line[7]
          mode = line[6]
        } else if (line[6] === 'Distanciel') {
          mode = line[6]
        } else {
          classroom = line[6]
        }

        scheduleTable.push({
          uv: line[0],
          type: line[1],
          day: line[2],
          startHour: line[3],
          endHour: line[4],
          frequency: line[5],
          classroom: classroom,
          mode: mode
        })
      }

      if (scheduleStr === '') {
        toaster.show(
          'Colles ton emploi du temps chef ! 📆',
          {
            position: 'bottom',
            duration: 2000,
            queue: true
          }
        )
        this.$emit('formValidated', null)
        return null
      } else if (scheduleStr.indexOf('\t') === -1) {
        toaster.show(
          'Colles ton emploi du temps directement depuis le site ! ✂️',
          {
            position: 'bottom',
            duration: 2000,
            queue: true
          }
        )
        this.$emit('formValidated', null)
        return null
      } else if (courses.start !== '' && courses.end === '') {
        toaster.show(
          'Tu oublierais pas la date de fin ? 🙃',
          {
            position: 'bottom',
            duration: 2000,
            queue: true
          }
        )
        this.$emit('formValidated', null)
        return null
      }

      const restArray = []
      if (rest1.start !== '') {
        restArray.push(rest1)
      }
      if (rest2.start !== '') {
        restArray.push(rest2)
      }
      this.$emit('formValidated', {
        schedule: scheduleTable,
        courses: courses,
        rests: restArray
      })
      return {
        schedule: scheduleTable,
        courses: courses,
        rests: restArray
      }
    }
  }
})
</script>

<style scoped>
    article {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      padding: 1.5rem;
      box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
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
      border-radius: 1rem;
      width: 91%;
      height: 30vh;
      padding: 4%;
      resize: none;
      background-color: #212121;
      border: solid rgba(4,97,159,1) 0.2rem;
      color: white;
      transition: 0.5s;
      /*border: solid rgb(252, 204, 12) 0.2rem;*/
    }

    form textarea:focus {
      border: solid white 0.2rem;
      outline: none;
      box-shadow: 0px 0px 15px 5px rgba(4,97,159,1);
      transition: 0.5s;
    }

    .date-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      gap: 0.5rem;
      border-radius: 1rem;
      background-color: rgba(4,97,159,1);
    }
</style>
