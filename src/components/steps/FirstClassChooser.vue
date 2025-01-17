<template>
  <StepFolder
    :folderColor="folderColor"
    title="Etape 2 : Choisis la date de ton premier cours (en fonction de ton groupe)"
    v-if="isUserData"
  >
    <header>
      Choisissez le type de semaine où vous avez les cours suivants
    </header>
    <article>
      <div class="class-chooser">
        <ClassChooser
          v-for="obj in userData_"
          :key="obj.id"
          :subject="obj.uv"
          :group="obj.type"
          :date1="obj.date1"
          :date2="obj.date2"
          :initial-date="obj.group"
          @dateAChange="obj.chosenDate = obj.date1 ? obj.date1 : 1"
          @dateBChange="obj.chosenDate = obj.date2 ? obj.date2 : 2"
        ></ClassChooser>
      </div>
      <SubmitButton text="C'est validé ! ​🚀​" @click="sendData"></SubmitButton>
    </article>
  </StepFolder>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClassChooser from "@/components/class_chooser_components/ClassChooser.vue";
import SubmitButton from "@/components/form_components/SubmitButton.vue";
import { createToaster } from "@meforma/vue-toaster";
import { DateChooser, ScheduleItem } from "@/models/types";
import StepFolder from "../containers/StepFolder.vue";
import { Color } from "@/models/color";

const toaster = createToaster();

export default defineComponent({
  name: "FirstClassChooser",
  components: { ClassChooser, SubmitButton, StepFolder },
  data() {
    return {
      folderColor: Color.fromHex("F3F6BC").toIColor(),
      week: new Map([
        ["lundi", 1],
        ["mardi", 2],
        ["mercredi", 3],
        ["jeudi", 4],
        ["vendredi", 5],
        ["samedi", 6],
        ["dimanche", 0],
      ]),
      nWeek: new Map([
        [1, "lundi"],
        [2, "mardi"],
        [3, "mercredi"],
        [4, "jeudi"],
        [5, "vendredi"],
        [6, "samedi"],
        [0, "dimanche"],
      ]),
      userData_: null as Array<DateChooser> | null,
    };
  },
  props: {
    userData: null as unknown as Record<string, unknown>,
  },
  computed: {
    isUserData(): boolean {
      return this.userData !== null;
    },
  },
  watch: {
    userData() {
      this.userData_ = this.frequencyObj();
    },
  },
  methods: {
    sendData() {
      if (
        this.userData_ &&
        this.userData_.filter((x) => x.chosenDate === null).length === 0
      ) {
        this.$emit("dateChosen", this.userData_);
        return this.userData_;
      }
      toaster.show("N'oublies pas d'UV camarade 🧐", {
        position: "bottom",
        duration: 2000,
        queue: true,
      });
      this.$emit("dateChosen", null);
      return null;
    },
    frequencyObj(): Array<DateChooser> {
      const copyUserData = this.userData as {
        courses: { start: string; end: string };
        schedule: Array<ScheduleItem>;
        rests: Array<{ start: string; end: string }>;
      } | null;
      const targetedCourses = this.freqAnalyze(copyUserData);
      if (targetedCourses !== null) {
        const freqObj = [] as Array<DateChooser>;
        let index = 0 as number;
        for (const course of targetedCourses) {
          if (course.date) {
            const { date1, date2 } = this.computeDates(course.date, course.day);
            freqObj.push({
              id: index++,
              uv: course.uv,
              type: course.type,
              group: course.group === "" ? undefined : course.group,
              day: course.day,
              date1: date1,
              date2: date2,
              chosenDate: null,
            });
          } else {
            freqObj.push({
              id: index++,
              uv: course.uv,
              type: course.type,
              group: course.group === "" ? undefined : course.group,
              day: course.day,
              date1: undefined,
              date2: undefined,
              chosenDate: null,
            });
          }
        }
        return freqObj;
      } else {
        return [];
      }
    },
    computeDates(date: string, day: string): { date1: Date; date2: Date } {
      let date1 = new Date(date);
      let date2 = new Date(date);
      const startDay = date1.getDay();
      const courseDay = this.week.get(day) as number;

      // console.log(startDay, courseDay)

      if (startDay <= courseDay) {
        date1 = this.addDay(date1, courseDay - startDay);
        date2 = this.addDay(date2, 7 + courseDay - startDay);
      } else {
        date1 = this.addDay(date1, 7 - (startDay - courseDay));
        date2 = this.addDay(date2, 14 - (startDay - courseDay));
      }
      return {
        date1: date1,
        date2: date2,
      };
    },
    addDay(date: Date, days: number): Date {
      const resultDate = new Date(date);
      resultDate.setDate(resultDate.getDate() + days);
      return resultDate;
    },
    freqAnalyze(
      data: {
        courses: { start: string; end: string };
        schedule: Array<ScheduleItem>;
        rests: Array<{ start: string; end: string }>;
      } | null
    ): Array<{
      uv: string;
      type: string;
      group: string;
      day: string;
      date: string | null;
    }> | null {
      if (data) {
        const freq2uv = data.schedule.filter(
          (course: { frequency: string }) => course.frequency === "2"
        );
        let freq2choices = [] as Array<{
          uv: string;
          type: string;
          group: string;
          day: string;
          date: string | null;
        }>;
        if (data.courses.start === "" || data.courses.end === "") {
          freq2choices = freq2uv.map(
            (course: {
              uv: string;
              type: string;
              day: string;
              group: string;
            }) => {
              return {
                uv: course.uv,
                type: course.type,
                day: course.day,
                group: course.group,
                date: null,
              };
            }
          );
        } else {
          freq2choices = freq2uv.map(
            (course: {
              uv: string;
              type: string;
              day: string;
              group: string;
            }) => {
              return {
                uv: course.uv,
                type: course.type,
                day: course.day,
                group: course.group,
                date: data.courses.start,
              };
            }
          );
        }
        return freq2choices;
      } else {
        return null;
      }
    },
  },
});
</script>
<style scoped>
header {
  margin-top: 1em;
  margin-left: 1.3em;
  align-self: flex-start;
  text-align: start;
  font-size: 1.2em;
  color: #727448;
}

article {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-radius: 1rem;
  gap: 1.5rem;
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
