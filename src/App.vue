<template>
  <body>
    <UserData @formValidated="getData"></UserData>
    <div class="body-content">
      <FirstClassChooser
        :userData="userData"
        @dateChosen="getDate"
      ></FirstClassChooser>
      <CustomSchedule
        :ics-data="icsData"
        :date-slots="scheduleGenerated?.schedule"
      ></CustomSchedule>
    </div>
  </body>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomSchedule from "./components/CustomSchedule.vue";
import FirstClassChooser from "./components/FirstClassChooser.vue";
import UserData from "./components/UserData.vue";
import {
  DateChooser,
  ScheduleWithChoice,
  ScheduleItem,
  Schedule,
  icsEvent,
} from "./models/types";
import { generateCorrectDates, generateICSObjects } from "./models/dateTools";

export default defineComponent({
  name: "App",
  components: {
    UserData,
    FirstClassChooser,
    CustomSchedule,
  },
  data() {
    return {
      userData: null as {
        courses: { start: string; end: string };
        schedule: Array<object>;
        rests: Array<{ start: string; end: string }>;
      } | null,
      dateSlots: null as Array<DateChooser> | null,
      icsData: undefined as Array<icsEvent> | undefined,
    };
  },
  computed: {
    scheduleGenerated(): Schedule | null {
      if (this.userData) {
        const scheduleData = [] as Array<ScheduleWithChoice>;
        const { courses, schedule, rests } = this.userData as {
          courses: {
            start: string;
            end: string;
          };
          rests: Array<{
            start: string;
            end: string;
          }>;
          schedule: Array<ScheduleItem>;
        };
        for (const course of schedule) {
          if (course.frequency !== "1") {
            if (this.dateSlots === null) {
              return null;
            }
            const slotObj = this.dateSlots.filter(
              (d) =>
                d.uv === course.uv &&
                d.type === course.type &&
                d.day === course.day
            );
            if (slotObj.length === 0 && slotObj[0].chosenDate === null) {
              return null;
            }
            scheduleData.push({ ...course, chosenDate: slotObj[0].chosenDate });
          } else {
            scheduleData.push({ ...course, chosenDate: null });
          }
        }

        return {
          courses: courses,
          rests: rests,
          schedule: scheduleData,
        };
      }
      return null;
    },
  },
  methods: {
    getData(
      content: {
        courses: { start: string; end: string };
        schedule: Array<ScheduleWithChoice>;
        rests: Array<{ start: string; end: string }>;
      } | null
    ) {
      this.userData = content;
    },
    getDate(content: Array<DateChooser> | null) {
      this.dateSlots = content;
      if (content !== null && this.scheduleGenerated !== null) {
        const dateItems = generateCorrectDates(this.scheduleGenerated);
        if (dateItems !== null) {
          this.icsData = generateICSObjects(dateItems);
        }
      }
    },
  },
});
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #232121;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.body-content {
  width: 50vw;
  background-color: rgba(240, 248, 255, 0.8);
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
  transition: all 0.2s;
}
</style>
