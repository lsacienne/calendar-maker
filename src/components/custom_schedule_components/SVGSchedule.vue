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
      return this.svgWidth - 2 * this.sideMargin;
    },
    innerHeight(): number {
      return this.svgHeight - 2 * this.verticalMargin;
    },
    columnWidth(): number {
      return this.innerWidth / this.nbDays;
    },
    slotWidth(): number {
      return 0.9 * this.columnWidth;
    },
  },
  mounted() {
    const canvas: SVGSVGElement = this.$refs.canvas as SVGSVGElement;
    /**
     * 
     const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
     rect.setAttribute("x", this.sideMargin.toString());
     rect.setAttribute("y", this.verticalMargin.toString());
     rect.setAttribute("width", this.innerWidth.toString());
     rect.setAttribute("height", this.innerHeight.toString());
     rect.setAttribute("fill", "red");
     canvas.prepend(rect);
     */
    /*
    const slot1 = this.createSlot(9, 0, "AP4A - TP 1", "B403", 2);
    const slot2 = this.createSlot(9, 1, "AP4A - TP 1", "B403", 2);
    const slot3 = this.createSlot(9, 2, "AP4A - TP 1", "B403", 2);
    const slot4 = this.createSlot(9, 3, "AP4A - TP 1", "B403", 2);
    const slot5 = this.createSlot(9, 4, "AP4A - TP 1", "B403", 2);
    canvas.appendChild(slot1);
    canvas.appendChild(slot2);
    canvas.appendChild(slot3);
    canvas.appendChild(slot4);
    canvas.appendChild(slot5);
    */
  },
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
        day * this.columnWidth +
        (this.columnWidth - this.slotWidth) / 2
      );
    },
    computeY(hourBegin: number) {
      return (
        this.verticalMargin +
        ((hourBegin - this.minHour) * this.innerHeight) /
          (this.maxHour - this.minHour)
      );
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
