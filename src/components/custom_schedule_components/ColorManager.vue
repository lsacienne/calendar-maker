<template>
  <div class="control-panel">
    <div class="color-line-container">
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
        v-model:is-squared="
          scheduleColorsManager.timeSlotColorManagers[index].isSquared
        "
        :is-uniform="getIsUniform(colorManager.uvName)"
      ></ColorLine>
    </div>
    <TopColorLine @update-uniform="updateIsUniform"></TopColorLine>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { VColorPicker } from "vuetify/components/VColorPicker";
import ColorSelector from "./ColorSelector.vue";
import ColorLine from "./ColorLine.vue";
import { scheduleColorsManager } from "@/models/scheduleColorsManager";
import { Color, TimeSlotUIManager } from "@/models/color";
import TopColorLine from "./TopColorLine.vue";

export default defineComponent({
  name: "ColorManager",
  components: {
    VColorPicker,
    ColorSelector,
    ColorLine,
    TopColorLine,
  },
  props: {
    modelValue: {
      type: Array as PropType<Array<TimeSlotUIManager>>,
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
  methods: {
    getIsUniform(uvName: string) {
      const targetTimeSlot =
        scheduleColorsManager.getTimeSlotColorManager(uvName);
      return targetTimeSlot?.backgroundColor === targetTimeSlot?.mainColor;
    },
    updateIsUniform(value: boolean) {
      // console.log("is uniform");
      scheduleColorsManager.timeSlotColorManagers.forEach((timeSlot) => {
        if (value) {
          timeSlot.backgroundColor = timeSlot.mainColor;
        } else {
          timeSlot.backgroundColor = Color.fromHex(timeSlot.mainColor)
            .lightenColor(0.8)
            .toHexString();
        }
      });
      this.uniform = value;
    },
  },
  data() {
    return {
      uniform: false as boolean,
    };
  },
});
</script>

<style scoped>
.control-panel {
  height: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.color-line-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
}
</style>
