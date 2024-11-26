<template>
  <div class="step-folder">
    <div class="folder-title">
      <div class="left-part" :style="{ background: _folderColor }">
        <h2>{{ title }}</h2>
      </div>
      <svg
        class="right-part"
        viewBox="0 0 70 62"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50.5162 52.2521L19.4838 9.74793C15.0218 3.63646 7.75336 0 0 0V62H70C62.2466 62 54.9782 58.3635 50.5162 52.2521Z"
          :fill="_folderColor"
        />
      </svg>
    </div>
    <div
      class="folder-content"
      :style="{
        background: _folderColor,
        boxShadow: `15px 15px 0px ${_folderShadow}`,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Color, IColor } from "@/models/color";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "StepFolder",
  props: {
    title: {
      type: String,
      required: false,
      default: "StepFolder",
    },
    folderColor: {
      type: Object as PropType<IColor>,
      required: false,
      default: { r: 255, g: 255, b: 255 },
    },
  },
  computed: {
    _folderColor(): string {
      return Color.fromIColor(this.folderColor).toHexString();
    },
    _folderShadow(): string {
      return Color.fromIColor(this.folderColor).darkenColor(0.5).toHexString();
    },
  },
});
</script>
<style lang="css" scoped>
.step-folder {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0;
}

h2 {
  font-size: 1em;
}

.folder-title {
  display: inline-flex;
  gap: 0;
  height: 2.5em;
}

.left-part {
  display: inline-flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  border-top-left-radius: 15px;
}

.right-part {
  height: 100%;
}

.folder-content {
  border-radius: 15px;
  border-top-left-radius: 0;
  width: 100%;
}
</style>
