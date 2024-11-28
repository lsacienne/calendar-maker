<template>
  <body>
    <div class="body-content">
      <PageTitleContainer></PageTitleContainer>
      <UserData @formValidated="getData"></UserData>
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
import CustomSchedule from "@/components/steps/CustomSchedule.vue";
import FirstClassChooser from "@/components/steps/FirstClassChooser.vue";
import UserData from "@/components/steps/UserData.vue";
import {
  DateChooser,
  ScheduleWithChoice,
  ScheduleItem,
  Schedule,
  icsEvent,
} from "@/models/types";
import { generateCorrectDates, generateICSObjects } from "@/models/dateTools";
import PageTitleContainer from "@/components/steps/PageTitleContainer.vue";

export default defineComponent({
  name: "App",
  components: {
    UserData,
    FirstClassChooser,
    CustomSchedule,
    PageTitleContainer,
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
@font-face {
  font-family: "JosefinSans";
  src: local("Trickster"),
    url("@/assets/fonts/Josefin_Sans/JosefinSans-VariableFont_wght.ttf");
}

body {
  font-family: "JosefinSans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #232121;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
  margin-bottom: 2em;
}

.body-content {
  width: 60vw;
  min-height: 50vh;

  display: flex;
  flex-direction: column;
  gap: 4em;
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
