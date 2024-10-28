<template>
  <g>
    <rect
      :x="x"
      :y="y"
      :width="width"
      :height="height"
      :fill="fillColor"
      :stroke="borderColor"
      :rx="borderRadius"
      :ry="borderRadius"
      xmlns="http://www.w3.org/2000/svg"
    >
    </rect>
    <text
      :x="textUVPosition.x"
      :y="textUVPosition.y"
      text-anchor="middle"
      dominant-baseline="middle"
      :font-size="fontSizeUV"
      font-weight="bold"
      font-family="Avenir, Helvetica, Arial, sans-serif"
      xmlns="http://www.w3.org/2000/svg"
      >{{ uvName }}</text
    >
    <text
      :x="textRoomPosition.x"
      :y="textRoomPosition.y"
      text-anchor="middle"
      dominant-baseline="middle"
      :font-size="fontSizeRoom"
      font-family="Avenir, Helvetica, Arial, sans-serif"
      xmlns="http://www.w3.org/2000/svg"
      >{{ room }}</text
    >
  </g>
</template>

<script lang="ts">
import { Color, IColor } from "@/models/color";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "SVGSchedule",
  props: {
    uvName: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    color: {
      type: Object as PropType<IColor>,
      default: Color.blue,
    },
    isSquared: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _color(): Color {
      return Color.fromIColor(this.color);
    },
    borderColor(): string {
      return this._color.toHexString();
    },
    fillColor(): string {
      return this._color.lightenColor(0.5).toHexString();
    },
    borderRadius(): number {
      return this.isSquared ? 0 : this.width / 10;
    },
    textUVPosition(): { x: number; y: number } {
      return {
        x: this.width / 2 + this.x,
        y: this.y + (this.height * 2) / 10,
      };
    },
    textRoomPosition(): { x: number; y: number } {
      return {
        x: this.width / 2 + this.x,
        y: this.y + (this.height * 5) / 10,
      };
    },
    fontSizeUV(): number {
      return (this.width * this.height) / 300;
    },
    fontSizeRoom(): number {
      return this.fontSizeUV * 0.8;
    },
  },
});
</script>
