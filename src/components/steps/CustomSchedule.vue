<template>
  <StepFolder
    v-if="isDisplayed"
    title="Etape 3 : Personnalises 🎨 & Télécharges 💾 !"
    :folder-color="folderColor"
  >
    <article>
      <div
        class="svg-schedule-container"
        :class="{ invisible: !isSVGScheduleDisplayed }"
      >
        <SVGSchedule
          ref="svgSchedule"
          :uv-courses="SVGUvCourse"
          :nb-days="nbDays"
        ></SVGSchedule>
        <ColorManager></ColorManager>
        <SubmitButton
          class="download-png"
          @click="handleExportPng"
          text="Télécharges en PNG 🖼️"
        />
      </div>
    </article>
  </StepFolder>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import SVGSchedule from "@/components/custom_schedule_components/SVGSchedule.vue";
import { scheduleColorsManager } from "@/models/scheduleColorsManager";
import {
  Course,
  frenchDays,
  icsEvent,
  ScheduleWithChoice,
  UVCourses,
} from "@/models/types";
import { createEvents } from "ics";
import { diffHours, getWeek, hourToDecimal } from "@/models/dateTools";
import { Color } from "@/models/color";
import ColorManager from "@/components/custom_schedule_components/ColorManager.vue";
import { Side } from "@/models/svg-utils";
import StepFolder from "../containers/StepFolder.vue";
import SubmitButton from "../form_components/SubmitButton.vue";

export default defineComponent({
  name: "CustomSchedule",
  components: {
    SVGSchedule,
    ColorManager,
    StepFolder,
    SubmitButton,
  },
  data() {
    return {
      filename: "agenda.ics",
      folderColor: Color.fromHex("#D8BCF6").toIColor(),
    };
  },
  computed: {
    nbDays(): number {
      if (this.SVGUvCourse !== undefined) {
        for (let uv of this.SVGUvCourse) {
          for (let course of uv.courses) {
            if (course.dayIdx === 5) {
              return 6;
            }
          }
        }
      }
      return 5;
    },
    isDisplayed(): boolean {
      return this.isSVGScheduleDisplayed;
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
        if (scheduleColorsManager.initialized === false) {
          uvMap.keys().forEach((key, index) => {
            scheduleColorsManager.addTimeSlotColorManager({
              uvName: key,
              mainColor: (colorPalette.at(index) ?? Color.white).toHexString(),
              backgroundColor: (
                colorPalette.at(index)?.lightenColor(0.8) ?? Color.white
              ).toHexString(),
              fontColor: Color.black.toHexString(),
              isSquared: false,
            });
          });
          scheduleColorsManager.setInitialColorManager();
        }

        uvMap.keys().forEach((key, index) => {
          uvCourses.push({
            uv: key,
            courses: uvMap.get(key)!,
            fillColor: Color.fromHex(
              scheduleColorsManager.timeSlotColorManagers.at(index)!
                .backgroundColor
            ),
            strokeColor: Color.fromHex(
              scheduleColorsManager.timeSlotColorManagers.at(index)!.mainColor
            ),
            fontColor: Color.fromHex(
              scheduleColorsManager.timeSlotColorManagers.at(index)!.fontColor
            ),
            isSquared:
              scheduleColorsManager.timeSlotColorManagers.at(index)!.isSquared,
          });
        });
        return uvCourses;
      }
      return undefined;
    },
  },
  props: {
    dateSlots: {
      required: false,
      type: Array as PropType<Array<ScheduleWithChoice> | undefined>,
      default: undefined,
    },
  },
  methods: {
    handleExportPng() {
      const svgSchedule = this.$refs.svgSchedule as InstanceType<
        typeof SVGSchedule
      >;
      svgSchedule.pngSchedule();
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
        //console.log(returnObject.value);
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
  padding: 2rem;
  padding-top: 4rem;
}

.ics-container,
.svg-schedule-container {
  width: 100%;
  border-radius: inherit;
}
.ics-container {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}

.svg-schedule-container {
  display: flex;
  flex-direction: column;
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

.download-png {
  margin-top: 1rem;
}
</style>
