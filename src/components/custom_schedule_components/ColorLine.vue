<template>
  <div class="control-line">
    <div
      class="uv-rect"
      :style="{
        borderColor: _borderColor,
        backgroundColor: _backgroundColor,
        color: _fontColor,
        borderRadius: '0.5rem',
      }"
    >
      {{ uvName }}
    </div>
    <ColorSelector
      picker-name="border color:"
      v-model="_borderColor"
    ></ColorSelector>
    <ColorSelector
      picker-name="font color:"
      v-model="_fontColor"
    ></ColorSelector>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ColorSelector from "./ColorSelector.vue";
import { Color } from "@/models/color";

export default defineComponent({
  name: "ColorManager",
  components: {
    ColorSelector,
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
  },
  emits: ["update:borderColor", "update:backgroundColor", "update:fontColor"],
  computed: {
    _borderColor: {
      get(): string {
        return this.borderColor;
      },
      set(value: string) {
        this.$emit("update:borderColor", value);
        this._backgroundColor = Color.fromHex(value)
          .lightenColor(0.8)
          .toHexString();
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
      },
    },
  },
});
</script>

<style scoped>
.control-line {
  display: inline-flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  width: 100%;
}

.uv-rect {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-width: 2px;
  border-style: solid;
}
</style>
