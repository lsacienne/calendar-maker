<template>
  <div class="control-line">
    <div
      style="grid-area: a"
      class="uv-rect"
      :style="{
        borderColor: _borderColor,
        backgroundColor: _backgroundColor,
        color: _fontColor,
        borderRadius: _isSquared ? '0' : '0.5rem',
      }"
    >
      {{ uvName }}
    </div>
    <ColorSelector
      style="grid-area: b"
      :input-type="borderType"
      picker-name="border color:"
      v-model="_borderColor"
    ></ColorSelector>
    <div class="input" style="grid-area: c">
      <v-btn @click="_isUniform = !_isUniform" color="grey-lighten-2">
        <img src="@/assets/img/icons/empty-background.svg" v-if="!_isUniform" />
        <img src="@/assets/img/icons/filled-background.svg" v-if="_isUniform" />
      </v-btn>
    </div>
    <ColorSelector
      style="grid-area: d"
      :input-type="fontType"
      picker-name="font color:"
      v-model="_fontColor"
    ></ColorSelector>
    <div class="input" style="grid-area: e">
      <v-btn @click="_isSquared = !_isSquared" color="grey-lighten-2">
        <img src="@/assets/img/icons/rounded-corner.svg" v-if="!_isSquared" />
        <img src="@/assets/img/icons/squared-corner.svg" v-if="_isSquared" />
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ColorSelector from "./ColorSelector.vue";
import { Color, ColorSelectorType } from "@/models/color";
import { VBtn } from "vuetify/lib/components/index.mjs";

export default defineComponent({
  name: "ColorLine",
  components: {
    ColorSelector,
    VBtn,
  },
  props: {
    uvName: {
      type: String,
      default: "UV Name",
      required: true,
    },
    borderColor: {
      type: String,
      default: "#000000",
      required: true,
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF",
      required: true,
    },
    fontColor: {
      type: String,
      default: "#000000",
      required: true,
    },
    isSquared: {
      type: Boolean,
      default: false,
      required: true,
    },
    isUniform: {
      default: false,
      required: true,
    },
  },
  emits: [
    "update:borderColor",
    "update:backgroundColor",
    "update:fontColor",
    "update:isSquared",
  ],
  computed: {
    _borderColor: {
      get(): string {
        return this.borderColor;
      },
      set(value: string) {
        this.$emit("update:borderColor", value);
        if (this._isUniform) {
          this._backgroundColor = value;
        } else {
          this._backgroundColor = Color.fromHex(value)
            .lightenColor(0.8)
            .toHexString();
        }
      },
    },
    _fontColor: {
      get(): string {
        return this.fontColor;
      },
      set(value: string) {
        this.$emit("update:fontColor", value);
      },
    },
    _backgroundColor: {
      get(): string {
        return this.backgroundColor;
      },
      set(value: string) {
        this.$emit("update:backgroundColor", value);
        const bgColor = Color.fromHex(value);
        if (bgColor.r * 0.299 + bgColor.g * 0.587 + bgColor.b * 0.114 > 150) {
          this._fontColor = "#000000";
        } else {
          this._fontColor = "#ffffff";
        }
      },
    },
    _isSquared: {
      get(): boolean {
        return this.isSquared;
      },
      set(value: boolean) {
        this.$emit("update:isSquared", value);
      },
    },
  },
  watch: {
    _isUniform: {
      immediate: true,
      handler(value: boolean) {
        if (value) {
          this._backgroundColor = this._borderColor;
        } else {
          this._backgroundColor = Color.fromHex(this._borderColor)
            .lightenColor(0.8)
            .toHexString();
        }
      },
    },
    isUniform: {
      immediate: true,
      handler(value: boolean) {
        this._isUniform = value;
      },
    },
  },
  data() {
    return {
      _isUniform: false as boolean,
      dotType: ColorSelectorType.DOT as ColorSelectorType,
      borderType: ColorSelectorType.BORDER as ColorSelectorType,
      fontType: ColorSelectorType.FONT as ColorSelectorType,
    };
  },
});
</script>

<style scoped>
.control-line {
  display: grid;
  grid-template-areas: "a b c d e";
  grid-template-rows: auto;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  width: 100%;
}

.uv-rect {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-style: solid;
  transition: border-radius 0.2s;
}

.input input:hover {
  cursor: pointer;
}
</style>
