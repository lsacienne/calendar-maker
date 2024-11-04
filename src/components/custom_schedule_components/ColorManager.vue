<template>
  <div class="control-panel">
    <ColorLine
      v-for="(
        colorManager, index
      ) in scheduleColorsManager.timeSlotColorManagers"
      :uv-name="colorManager.uvName"
      v-model:border-color="
        scheduleColorsManager.timeSlotColorManagers[index].mainColor
      "
      v-model:font-color="
        scheduleColorsManager.timeSlotColorManagers[index].fontColor
      "
      v-model:background-color="
        scheduleColorsManager.timeSlotColorManagers[index].backgroundColor
      "
    ></ColorLine>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { VColorPicker } from "vuetify/components/VColorPicker";
import ColorSelector from "./ColorSelector.vue";
import ColorLine from "./ColorLine.vue";
import { scheduleColorsManager } from "@/models/scheduleColorsManager";
import {
  Color,
  TimeSlotColorManager,
  TimeSlotColorManagerString,
} from "@/models/color";

export default defineComponent({
  name: "ColorManager",
  components: {
    VColorPicker,
    ColorSelector,
    ColorLine,
  },
  props: {
    modelValue: {
      type: Array as PropType<Array<TimeSlotColorManager>>,
      default: () => [],
      required: true,
    },
  },
  emits: ["update:modelValue"],
  computed: {
    scheduleColorsManager() {
      return scheduleColorsManager;
    },
  },
});
</script>

<style scoped>
.control-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 0.5rem;

  background: #f5f5f5;
  border-radius: 1rem;
}
</style>
