<template>
  <div class="control-line">
    <div class="lines-appearance">
      <ColorSelector
        pickerTooltip="Couleur des lignes"
        :v-model="_generalSettings.linesColor"
      ></ColorSelector>
      <label for="is-lines-displayed">Afficher les lignes</label>
      <input
        type="checkbox"
        name="is-lines-displayed"
        @input="_generalSettings.linesEnabled = !_generalSettings.linesEnabled"
        :checked="_generalSettings.linesEnabled"
      />
    </div>
    <div class="labels-appearance">
      <ColorSelector
        pickerTooltip="Heures:"
        :v-model="_generalSettings.hourLabelsColors"
      ></ColorSelector>
      <ColorSelector
        pickerTooltip="Jours:"
        :v-model="_generalSettings.daysLabelsColors"
      ></ColorSelector>
    </div>
    <div class="background-appearance">
      <ColorSelector
        pickerTooltip="Couleur du fond:"
        :v-model="_generalSettings.backgroundColor"
      ></ColorSelector>
      <label for="is-background-displayed">Afficher le fond</label>
      <input
        type="checkbox"
        name="is-background-displayed"
        @input="
          _generalSettings.backgroundEnabled =
            !_generalSettings.backgroundEnabled
        "
        :checked="_generalSettings.backgroundEnabled"
      />
    </div>
    <div class="name-selector"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ColorSelector from "./ColorSelector.vue";
import { Color } from "@/models/color";
import {
  GeneralSettings,
  scheduleColorsManager,
} from "@/models/scheduleColorsManager";

export default defineComponent({
  name: "GraphLinesManager",
  components: {
    ColorSelector,
  },
  computed: {
    _generalSettings(): GeneralSettings {
      return scheduleColorsManager.generalSettings;
    },
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
