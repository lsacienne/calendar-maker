<template>
  <div class="canvas-container">
    <div class="toolbar"></div>
    <svg
      class="canvas"
      ref="canvas"
      :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      preserve-aspect-ratio="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        v-for="line in hoursConstructionLines"
        class="hour-divider"
        :x1="sideMargin + hourLabelsContainerWidth"
        :y1="computeY(line)"
        :x2="svgWidth - 5"
        :y2="computeY(line)"
        stroke="#4a4646"
        stroke-width="0.5"
        stroke-linecap="round"
        stroke-dasharray="2 2"
        xmlns="http://www.w3.org/2000/svg"
      ></line>
      <text
        v-for="line in hoursConstructionLines"
        fill="#4a4646"
        :x="sideMargin * 2"
        :y="computeY(line)"
        dominant-baseline="middle"
        text-anchor="start"
        :font-size="sideMargin * 0.7"
        xmlns="http://www.w3.org/2000/svg"
      >
        {{ convertDecimalToHour(line) }}
      </text>
      <text
        v-for="day in [...Array(nbDays).keys()]"
        :x="computeX(day) + slotWidth / 2"
        :y="verticalMargin"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="#4a4646"
        :font-size="verticalMargin * 0.5"
        xmlns="http://www.w3.org/2000/svg"
      >
        {{ getDay(day) }}
      </text>
      <SVGTimeSlot
        v-for="uv in uvs"
        :key="uv.uvName"
        :uvName="uv.uvName"
        :room="uv.room"
        :x="computeX(uv.day)"
        :y="computeY(uv.hourBegin)"
        :width="slotWidth"
        :color="uv.color.toIColor()"
        :height="computeHeight(uv.hourSize)"
        :isSquared="false"
      ></SVGTimeSlot>
    </svg>
  </div>
  <button @click="pngSchedule"></button>
</template>

<script lang="ts">
import { Color } from "@/models/color";
import { SVGtoPNG } from "@/utils/svg-to-png";
import { computed, defineComponent, PropType } from "vue";
import SVGTimeSlot from "./SVGTimeSlot.vue";
import { frenchDays } from "@/models/types";

export default defineComponent({
  name: "SVGSchedule",
  components: {
    SVGTimeSlot,
  },
  props: {
    schedule: Array<object>,
    svgWidth: {
      type: Number,
      default: 290,
    },
    svgHeight: {
      type: Number,
      default: 210,
    },
    nbDays: {
      type: Number,
      default: 5,
    },
    minHour: {
      type: Number,
      default: 8,
    },
    maxHour: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      _uvs: [
        {
          hourBegin: 9,
          day: 0,
          uvName: "AP4A - TP 1",
          room: "B403",
          hourSize: 2,
          color: Color.blue,
        },
        {
          hourBegin: 9,
          day: 1,
          uvName: "AP4A - TP 1",
          room: "B403",
          hourSize: 2,
          color: Color.fromRGB(255, 255, 0) as Color,
        },
        {
          hourBegin: 9,
          day: 2,
          uvName: "AP4A - TP 1",
          room: "B403",
          hourSize: 2,
          color: Color.red as Color,
        },
        {
          hourBegin: 9,
          day: 3,
          uvName: "AP4A - TP 1",
          room: "B403",
          hourSize: 2,
          color: Color.red as Color,
        },
        {
          hourBegin: 9,
          day: 4,
          uvName: "AP4A - TP 1",
          room: "B403",
          hourSize: 2,
          color: Color.red as Color,
        },
      ],
      get uvs() {
        return this._uvs;
      },
      set uvs(value) {
        this._uvs = value;
      },
      hoursConstructionLines: [8, 10, 10.25, 12.25, 14, 16, 16.25, 19.25],
    };
  },
  computed: {
    sideMargin(): number {
      return this.svgWidth / 50;
    },
    verticalMargin(): number {
      return this.svgHeight / 20;
    },
    innerWidth(): number {
      return (
        this.svgWidth - 2 * this.sideMargin - this.hourLabelsContainerWidth
      );
    },
    hourLabelsContainerWidth(): number {
      return this.sideMargin * 4;
    },
    innerHeight(): number {
      return (
        this.svgHeight - 2 * this.verticalMargin - this.dayLabelsContainerHeight
      );
    },
    dayLabelsContainerHeight(): number {
      return this.verticalMargin;
    },
    columnWidth(): number {
      return this.innerWidth / this.nbDays;
    },
    slotWidth(): number {
      return 0.9 * this.columnWidth;
    },
  },
  mounted() {},
  methods: {
    pngSchedule(event: MouseEvent): void {
      const canvas: SVGSVGElement = this.$refs.canvas as SVGSVGElement;
      SVGtoPNG(canvas, this.svgWidth * 5, this.svgHeight * 5);
    },
    computeHeight(hourSize: number) {
      return (this.innerHeight / (this.maxHour - this.minHour)) * hourSize;
    },
    computeX(day: number) {
      return (
        this.sideMargin +
        this.hourLabelsContainerWidth +
        day * this.columnWidth +
        (this.columnWidth - this.slotWidth) / 2
      );
    },
    computeY(hourBegin: number) {
      return (
        this.verticalMargin +
        this.dayLabelsContainerHeight +
        ((hourBegin - this.minHour) * this.innerHeight) /
          (this.maxHour - this.minHour)
      );
    },
    convertDecimalToHour(decimal: number): string {
      const hour = Math.floor(decimal);
      const minutes = Math.round((decimal - hour) * 60)
        .toString()
        .padStart(2, "0");
      return `${hour}h${minutes}`;
    },
    getDay(value: number) {
      return frenchDays.at(value);
    },
  },
});
</script>

<style scoped>
.canvas-container {
  width: 100%;
}

.canvas {
  border-radius: 1rem;
  width: 100%;
  background-color: whitesmoke;
}
</style>
