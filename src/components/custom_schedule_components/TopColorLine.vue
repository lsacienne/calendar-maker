<template>
  <div class="control-line">
    <ColorSelector
      picker-name="border color:"
      v-model="_mainColor"
    ></ColorSelector>
    <div class="input">
      <label for="is-uniform">uniforme:</label>
      <input
        name="is-uniform"
        type="checkbox"
        @input="_isUniform = !_isUniform"
      />
    </div>
    <ColorSelector
      picker-name="font color:"
      v-model="_fontColor"
    ></ColorSelector>
    <div class="input">
      <label for="is-rounded">arrondi:</label
      ><input
        name="is-rounded"
        type="checkbox"
        @input="_isSquared = !_isSquared"
        :checked="!_isSquared"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ColorSelector from "./ColorSelector.vue";
import { scheduleColorsManager } from "@/models/scheduleColorsManager";
import { Color } from "@/models/color";

export default defineComponent({
  name: "TopColorLine",
  components: {
    ColorSelector,
  },
  emits: ["updateUniform"],
  computed: {
    _mainColor: {
      get(): string {
        let globalColor: string | undefined = undefined;
        for (let timeSlot of scheduleColorsManager.timeSlotColorManagers) {
          const localColor = timeSlot.mainColor;
          if (globalColor === undefined) {
            globalColor = localColor;
          } else if (globalColor !== localColor) {
            globalColor = undefined;
            break;
          }
        }
        if (globalColor === undefined) {
          return "#000000";
        }
        return globalColor;
      },
      set(value: string) {
        scheduleColorsManager.timeSlotColorManagers.forEach((timeSlot) => {
          timeSlot.mainColor = value;
          if (this.isUniform) {
            timeSlot.backgroundColor = value;
          } else {
            timeSlot.backgroundColor = Color.fromHex(value)
              .lightenColor(0.8)
              .toHexString();
          }
          const bgColor = Color.fromHex(timeSlot.backgroundColor);
          if (bgColor.r * 0.299 + bgColor.g * 0.587 + bgColor.b * 0.114 > 150) {
            this._fontColor = "#000000";
          } else {
            this._fontColor = "#ffffff";
          }
        });
      },
    },
    _fontColor: {
      get(): string {
        let globalColor: string | undefined = undefined;
        for (let timeSlot of scheduleColorsManager.timeSlotColorManagers) {
          const localColor = timeSlot.fontColor;
          if (globalColor === undefined) {
            globalColor = localColor;
          } else if (globalColor !== localColor) {
            globalColor = undefined;
            break;
          }
        }
        if (globalColor === undefined) {
          return "#000000";
        }
        return globalColor;
      },
      set(value: string) {
        scheduleColorsManager.timeSlotColorManagers.forEach(
          (timeSlot) => (timeSlot.fontColor = value)
        );
      },
    },
    _isSquared: {
      get(): boolean {
        return this.isSquared.valueOf();
      },
      set(value: boolean) {
        this.isSquared = value;
        scheduleColorsManager.timeSlotColorManagers.forEach(
          (timeSlot) => (timeSlot.isSquared = value)
        );
      },
    },
    _isUniform: {
      get(): boolean {
        return this.isUniform.valueOf();
      },
      set(value: boolean) {
        this.isUniform = value;
        this.$emit("updateUniform", value);
      },
    },
  },
  data() {
    return {
      isUniform: false as Boolean,
      isSquared: false as Boolean,
    };
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
  transition: border-radius 0.2s;
}

.input input:hover {
  cursor: pointer;
}
</style>
