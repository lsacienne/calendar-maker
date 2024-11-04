<template>
  <g>
    <rect
      :x="computedX"
      :y="y"
      :width="computedWidth"
      :height="height"
      :fill="_fillColor"
      :stroke="_borderColor"
      :rx="borderRadius"
      :ry="borderRadius"
      xmlns="http://www.w3.org/2000/svg"
    >
    </rect>
    <text
      :x="textUVPosition.x"
      :y="textUVPosition.y"
      white-space="normal"
      text-anchor="middle"
      dominant-baseline="middle"
      :fill="_fontColor"
      :font-size="computedFontSizeUV"
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
      :fill="_fontColor"
      :font-size="fontSizeRoom"
      font-family="Avenir, Helvetica, Arial, sans-serif"
      xmlns="http://www.w3.org/2000/svg"
      >{{ room }}</text
    >
  </g>
</template>

<script lang="ts">
import { Color, IColor } from "@/models/color";
import { Side } from "@/models/svg-utils";
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
    fontSizeUV: {
      type: Number,
      required: true,
    },
    strokeColor: {
      type: Object as PropType<IColor>,
      required: true,
    },
    fillColor: {
      type: Object as PropType<IColor>,
      required: true,
    },
    fontColor: {
      type: Object as PropType<IColor>,
      required: true,
    },
    isSquared: {
      type: Boolean,
      default: false,
    },
    side: {
      type: Number as PropType<Side>,
      default: Side.NONE,
      required: false,
    },
  },
  computed: {
    _borderColor(): string {
      return Color.fromIColor(this.strokeColor).toHexString();
    },
    _fillColor(): string {
      return Color.fromIColor(this.fillColor).toHexString();
    },
    _fontColor(): string {
      return Color.fromIColor(this.fontColor).toHexString();
    },
    computedWidth(): number {
      switch (this.side) {
        case Side.NONE: {
          return this.width;
        }
        case Side.LEFT: {
          return this.width / 2;
        }
        case Side.RIGHT: {
          return this.width / 2;
        }
        default: {
          return this.width;
        }
      }
    },
    computedX(): number {
      switch (this.side) {
        case Side.NONE: {
          return this.x;
        }
        case Side.LEFT: {
          return this.x;
        }
        case Side.RIGHT: {
          return this.x + this.computedWidth;
        }
        default: {
          return this.x;
        }
      }
    },
    borderRadius(): number {
      return this.isSquared ? 0 : this.computedWidth / 10;
    },
    textUVPosition(): { x: number; y: number } {
      return {
        x: this.computedWidth / 2 + this.computedX,
        y:
          this.y +
          Math.min(1.5 * this.computedFontSizeUV, (4 * this.height) / 10),
      };
    },
    textRoomPosition(): { x: number; y: number } {
      return {
        x: this.computedWidth / 2 + this.computedX,
        y: this.textUVPosition.y + 1.2 * this.computedFontSizeUV,
      };
    },
    computedFontSizeUV(): number {
      switch (this.side) {
        case Side.NONE: {
          return this.fontSizeUV;
        }
        case Side.LEFT: {
          return this.fontSizeUV * 0.8;
        }
        case Side.RIGHT: {
          return this.fontSizeUV * 0.8;
        }
        default: {
          return this.fontSizeUV;
        }
      }
    },
    fontSizeRoom(): number {
      return this.computedFontSizeUV * 0.8;
    },
  },
});
</script>
