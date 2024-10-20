<template>
  <div class="canvas-container">
    <div class="toolbar"></div>
    <svg
      class="canvas"
      ref="canvas"
      :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      preserve-aspect-ratio="true"
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  </div>
</template>

<script lang="ts">
import { Color } from "@/models/color";
import { defineComponent } from "vue";

interface RectParams {
  isSquared?: boolean;
  color?: Color;
}

export default defineComponent({
  name: "SVGSchedule",
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
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", this.sideMargin.toString());
    rect.setAttribute("y", this.verticalMargin.toString());
    rect.setAttribute("width", this.innerWidth.toString());
    rect.setAttribute("height", this.innerHeight.toString());
    rect.setAttribute("fill", "red");
    canvas.appendChild(rect);
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
  },
  methods: {
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
    createSlot(
      hourBegin: number,
      day: number,
      uvName: string,
      room: string,
      hourSize: number,
      rectParams?: RectParams
    ): SVGGElement {
      const slot: SVGRectElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      const [x, y, height, width] = [
        this.computeX(day),
        this.computeY(hourBegin),
        this.computeHeight(hourSize),
        this.slotWidth,
      ];

      let borderColor: Color =
        rectParams?.color || Color.blue.lightenColor(0.5);
      let fillColor: Color = borderColor.lightenColor(0.5);
      slot.setAttribute("x", x.toString());
      slot.setAttribute("y", y.toString());
      slot.setAttribute("width", width.toString());
      slot.setAttribute("height", height.toString());
      slot.setAttribute("fill", fillColor.toHexString());
      slot.setAttribute("stroke", borderColor.toHexString());
      slot.setAttribute("stroke-width", (height / 50).toString());

      if (!rectParams?.isSquared) {
        slot.setAttribute("rx", (width / 10).toString());
        slot.setAttribute("ry", (width / 10).toString());
      }

      const fontSizeUV = (width * height) / 300;
      const textUV: SVGTextElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      textUV.setAttribute("x", (width / 2 + x).toString());
      textUV.setAttribute("y", (y + height / 10).toString());
      textUV.setAttribute("text-anchor", "middle");
      textUV.setAttribute("dominant-baseline", "hanging");
      textUV.setAttribute("font-size", fontSizeUV.toString());
      textUV.setAttribute("font-weight", "bold");

      textUV.textContent = uvName;

      const fontSizeRoom = fontSizeUV * 0.8;
      const textRoom: SVGTextElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      textRoom.setAttribute("x", (width / 2 + x).toString());
      textRoom.setAttribute("y", (y + height / 2).toString());
      textRoom.setAttribute("text-anchor", "middle");
      textRoom.setAttribute("dominant-baseline", "hanging");
      textRoom.setAttribute("font-size", fontSizeRoom.toString());
      textRoom.textContent = room;

      const group: SVGGElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      );
      group.appendChild(slot);
      group.appendChild(textUV);
      group.appendChild(textRoom);
      return group;
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
