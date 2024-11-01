<template>
  <article :class="{ invisible: !isDisplayed }">
    <h1>3. Personnalises 🎨 & Télécharges 💾 !</h1>
    <div class="ics-container" :class="{ invisible: icsData === undefined }">
      <p>💾 Télécharges ton fichier ICS et importes le sur ton agenda !</p>
      <input type="text" name="" id="" v-model="filename" />
      <a :href="icsURL" :download="filenameComp">
        <button>ICS File 📆</button>
      </a>
    </div>
    <div
      class="svg-schedule-container"
      :class="{ invisible: !isSVGScheduleDisplayed }"
    >
      <SVGSchedule :uv-courses="SVGUvCourse"></SVGSchedule>
    </div>

    <!-- CanvasSchedule></CanvasSchedule -->
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import SVGSchedule from "./custom_schedule_components/SVGSchedule.vue";
import {
  Course,
  frenchDays,
  icsEvent,
  ScheduleWithChoice,
  UVCourses,
} from "@/models/types";
import { createEvents } from "ics";
import { diffHours, hourToDecimal } from "@/models/dateTools";
import { Color } from "@/models/color";
import { Side } from "@/models/svg-utils";

export default defineComponent({
  name: "CustomSchedule",
  components: {
    SVGSchedule,
  },
  data() {
    return {
      icsURL: "#",
      filename: "agenda.ics",
    };
  },
  computed: {
    filenameComp() {
      if (this.filename.endsWith(".ics")) {
        return this.filename;
      }
      return this.filename + ".ics";
    },
    isDisplayed(): boolean {
      return this.icsData !== undefined || this.isSVGScheduleDisplayed;
    },
    isSVGScheduleDisplayed(): boolean {
      if (this.dateSlots === undefined) {
        return false;
      }
      this.dateSlots.forEach((date) => {
        if (date.chosenDate === null) {
          return false;
        }
      });
      return true;
    },
    SVGUvCourse(): Array<UVCourses> | undefined {
      if (this.isSVGScheduleDisplayed) {
        const uvMap: Map<string, Array<Course>> = new Map();
        let firstWeek: number;
        this.dateSlots!.forEach((dateSlot: ScheduleWithChoice) => {
          if (
            parseInt(dateSlot.frequency) === 1 ||
            dateSlot.chosenDate !== null
          ) {
            let side = Side.NONE;
            if (dateSlot.chosenDate !== null) {
              if (typeof dateSlot.chosenDate === "number") {
                if (dateSlot.chosenDate === 1) {
                  side = Side.LEFT;
                } else if (dateSlot.chosenDate === 2) {
                  side = Side.RIGHT;
                }
              } else if (typeof dateSlot.chosenDate === "object") {
                const week = getWeek(dateSlot.chosenDate);
                if (firstWeek === undefined) {
                  firstWeek = week;
                  side = Side.LEFT;
                } else {
                  if (week === firstWeek) {
                    side = Side.LEFT;
                  } else {
                    side = Side.RIGHT;
                  }
                }
              }
            }
            const course: Course = {
              type: dateSlot.type,
              dayIdx: frenchDays.findIndex((value) => value === dateSlot.day),
              startHour: hourToDecimal(dateSlot.startHour),
              duration: diffHours(dateSlot.startHour, dateSlot.endHour) / 60,
              classroom: dateSlot.classroom,
              side: side,
              mode: dateSlot.mode,
              group: dateSlot.group,
            };
            if (uvMap.has(dateSlot.uv)) {
              uvMap.get(dateSlot.uv)?.push(course);
            } else {
              uvMap.set(dateSlot.uv, [course]);
            }
          }
        });
        const uvCourses: Array<UVCourses> = [];
        const colorPalette = Color.defaultPalette();
        uvMap.keys().forEach((key, index) => {
          const currentColor = colorPalette.at(index);
          uvCourses.push({
            uv: key,
            courses: uvMap.get(key)!,
            fillColor: currentColor!.lightenColor(0.8),
            strokeColor: currentColor!,
          });
        });
        return uvCourses;
      }
      return undefined;
    },
  },
  props: {
    icsData: {
      required: false,
      type: Array as PropType<Array<icsEvent>>,
      default: undefined,
    },
    dateSlots: {
      required: false,
      type: Array as PropType<Array<ScheduleWithChoice> | undefined>,
      default: undefined,
    },
  },
  watch: {
    icsData() {
      this.generateURL();
    },
  },
  methods: {
    async generateURL() {
      if (this.icsData !== undefined) {
        const filename = "agenda.ics";
        const file = await this.createFilePromise(filename, this.icsData);
        this.icsURL = URL.createObjectURL(file);
      } else {
        this.icsURL = "#";
      }
    },
    createFilePromise(
      filename: string,
      icsData: Array<icsEvent>
    ): Promise<File> {
      return new Promise((resolve, reject) => {
        const returnObject = createEvents(icsData);
        if (returnObject.error) {
          reject(returnObject.error);
        }
        console.log(returnObject.value);
        if (returnObject.value !== undefined) {
          resolve(
            new File([returnObject.value], filename, { type: "text/calendar" })
          );
        }
      });
    },
  },
});
</script>

<style scoped>
article {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 216, 59, 0.5);
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  row-gap: 1rem;
  border-radius: 1rem;
}

article.invisible {
  display: none;
}

h1 {
  margin-left: 4rem;
  align-self: flex-start;
}

.ics-container,
.svg-schedule-container {
  width: 95%;
  padding: 1rem;
  display: inline-flex;
  background-color: rgb(230, 195, 116);
  border-radius: inherit;
  align-items: center;
  justify-content: space-between;
}

.ics-container.invisible,
.svg-schedule-container.invisible {
  display: none;
}

.ics-container p {
  font-size: 1.2rem;
}

a {
  color: inherit;
}

button {
  color: inherit;
  align-self: center;
  padding: 0.5rem;
  font-size: 1.5rem;
  border-radius: 0.7rem;
  background-color: rgb(164, 139, 187);
  border: solid rgb(88, 36, 136) 0.2rem;
  transition: background-color 0.3s, color 0.2s, border 0.1s;
}

button:hover {
  background-color: rgb(88, 36, 136);
  color: aliceblue;
}

button:active {
  border: solid rgb(125, 110, 139) 0.2rem;
  background-color: rgb(125, 110, 139);
  color: aliceblue;
}
</style>
