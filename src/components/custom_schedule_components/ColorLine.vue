<template>
  <div class="control-line">
    <div class="first-line">
      <div
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
    </div>
    <div class="second-line">
      <v-btn
        @click="_isSquared = !_isSquared"
        color="grey-lighten-2"
        size="small"
        :slim="true"
      >
        <img src="@/assets/img/icons/rounded-corner.svg" v-if="!_isSquared" />
        <img src="@/assets/img/icons/squared-corner.svg" v-if="_isSquared" />
        <v-tooltip activator="parent" location="bottom">
          Changer type de coins
        </v-tooltip>
      </v-btn>
      <ColorSelector
        :input-type="borderType"
        picker-name="border color:"
        v-model="_borderColor"
      ></ColorSelector>
      <v-btn
        @click="_isUniform = !_isUniform"
        color="grey-lighten-2"
        size="small"
        :slim="true"
      >
        <img src="@/assets/img/icons/empty-background.svg" v-if="!_isUniform" />
        <img src="@/assets/img/icons/filled-background.svg" v-if="_isUniform" />
        <v-tooltip activator="parent" location="bottom">
          Appliquer la couleur au fond
        </v-tooltip>
      </v-btn>
      <ColorSelector
        :input-type="fontType"
        picker-name="font color:"
        v-model="_fontColor"
      ></ColorSelector>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ColorSelector from "./ColorSelector.vue";
import { Color, ColorSelectorType } from "@/models/color";
import { VBtn, VTooltip } from "vuetify/lib/components/index.mjs";

export default defineComponent({
  name: "ColorLine",
  components: {
    ColorSelector,
    VBtn,
    VTooltip,
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
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  background-color: #595959;
  border-radius: 1rem;
  padding: 1rem;
}

.first-line {
  display: inline-flex;
  align-items: flex-start;
}

.second-line {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.2rem;
}

.v-btn {
  min-width: 0;
}

.uv-rect {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  width: 50%;
  border-width: 2px;
  border-style: solid;
  transition: border-radius 0.2s;
}

.input input:hover {
  cursor: pointer;
}
</style>
