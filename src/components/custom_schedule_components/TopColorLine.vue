<template>
  <div class="control-line">
    <h2>GLOBAL</h2>
    <div class="items">
      <v-btn @click="_isSquared = !_isSquared" color="grey-lighten-2">
        <img src="@/assets/img/icons/rounded-corner.svg" v-if="!_isSquared" />
        <img
          src="@/assets/img/icons/squared-corner.svg"
          v-else-if="_isSquared"
        />
        <v-tooltip activator="parent" location="bottom">
          Changer type de coins globalement
        </v-tooltip>
      </v-btn>
      <ColorSelector
        :input-type="borderType"
        picker-tooltip="Changer la couleur des bordures globale"
        v-model="_mainColor"
      ></ColorSelector>
      <v-btn @click="_isUniform = !_isUniform" color="grey-lighten-2">
        <img src="@/assets/img/icons/empty-background.svg" v-if="!_isUniform" />
        <img
          src="@/assets/img/icons/filled-background.svg"
          v-else-if="_isUniform"
        />
        <v-tooltip activator="parent" location="bottom">
          Appliquer la couleur au fond globalement
        </v-tooltip>
      </v-btn>
      <ColorSelector
        :input-type="fontType"
        picker-tooltip="Changer la couleur de police globale"
        v-model="_fontColor"
      ></ColorSelector>
    </div>
    <v-tooltip location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn
          icon="mdi-history"
          v-bind="props"
          density="comfortable"
          elevation="12"
          color="grey-darken-1"
          @click="resetAllUV"
        ></v-btn>
      </template>
      Réinitialiser toutes les UV
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ColorSelector from "./ColorSelector.vue";
import { scheduleColorsManager } from "@/models/scheduleColorsManager";
import { Color, ColorSelectorType } from "@/models/color";
import { VBtn } from "vuetify/lib/components/index.mjs";

export default defineComponent({
  name: "TopColorLine",
  components: {
    ColorSelector,
    VBtn,
  },
  emits: ["updateUniform"],
  methods: {
    resetAllUV() {
      scheduleColorsManager.resetAllColorManagers();
      const newValue: boolean =
        scheduleColorsManager.timeSlotColorManagers.reduce(
          (acc, timeSlot) =>
            acc && timeSlot.backgroundColor === timeSlot.mainColor,
          true
        );
      this._isUniform = newValue;
    },
  },
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
      dotType: ColorSelectorType.DOT as ColorSelectorType,
      borderType: ColorSelectorType.BORDER as ColorSelectorType,
      fontType: ColorSelectorType.FONT as ColorSelectorType,
    };
  },
});
</script>

<style scoped>
.control-line {
  background-color: #595959;
  padding: 1rem;
  margin: auto;
  display: inline-flex;
  justify-content: space-between;
  flex-basis: auto;
  border-radius: 1rem;
  gap: 1rem;
  min-width: 60%;
}

.items {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
}

h2 {
  color: white;
  font-weight: normal;
}

.input input:hover {
  cursor: pointer;
}
</style>
