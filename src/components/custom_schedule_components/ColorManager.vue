<template>
  <div class="control-panel">
    <TopColorLine @update-uniform="updateIsUniform"></TopColorLine>
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
      :is-uniform="uniform"
    ></ColorLine>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { VColorPicker } from "vuetify/components/VColorPicker";
import ColorSelector from "./ColorSelector.vue";
import ColorLine from "./ColorLine.vue";
import { scheduleColorsManager } from "@/models/scheduleColorsManager";
import { TimeSlotUIManager } from "@/models/color";
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
    updateIsUniform(value: boolean) {
      console.log("is uniform");
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

  background: #f5f5f5;
  border-radius: 1rem;
}
</style>
