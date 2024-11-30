<template>
  <div class="color-selector">
    <p>{{ pickerName ?? "" }}</p>
    <svg
      v-if="isDotType"
      class="clickable-dot"
      viewBox="0 0 50 50"
      :fill="color"
      @click="dotClicked = !dotClicked"
      preserve-aspect-ratio="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        r="25"
        xmlns="http://www.w3.org/2000/svg"
      ></circle>
    </svg>
    <v-btn
      v-else-if="isBorderType"
      @click="dotClicked = !dotClicked"
      color="grey-lighten-2"
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.64658 21.5034H4.49918L15.9125 10.0901L14.0599 8.23747L2.64658 19.6508V21.5034ZM21.5696 8.1713L15.9456 2.61349L17.7982 0.76089C18.3055 0.25363 18.9287 0 19.668 0C20.4064 0 21.0292 0.25363 21.5365 0.76089L23.3891 2.61349C23.8964 3.12075 24.161 3.73299 24.1831 4.45022C24.2051 5.16656 23.9625 5.77836 23.4553 6.28562L21.5696 8.1713ZM1.32329 24.15C0.948356 24.15 0.634296 24.023 0.381107 23.7689C0.127036 23.5157 0 23.2016 0 22.8267V19.0884C0 18.912 0.0330823 18.7413 0.0992466 18.5763C0.165411 18.4105 0.264657 18.2614 0.396986 18.129L14.0269 4.49918L19.6508 10.1231L6.02096 23.753C5.88863 23.8853 5.73998 23.9846 5.57501 24.0508C5.40916 24.1169 5.23801 24.15 5.06158 24.15H1.32329ZM14.9862 9.16377L14.0599 8.23747L15.9125 10.0901L14.9862 9.16377Z"
          fill="#404040"
        />
        <path
          d="M0 0.497042V16.073C0 16.5184 0.538571 16.736 0.853553 16.4211L3.8843 13.3903C3.97807 13.2965 4.03074 13.1694 4.03074 13.0368V4.53074C4.03074 4.2546 4.2546 4.03074 4.53074 4.03074H11.5164C14.3955 4.03074 14.3955 0 11.5164 0H0.499999C0.223857 0 0 0.2209 0 0.497042Z"
          :fill="color"
        />
      </svg>
      <img src="@/assets/img/icons/develop-arrow.svg" />
    </v-btn>
    <v-btn
      v-else-if="isFontType"
      @click="dotClicked = !dotClicked"
      color="grey-lighten-2"
    >
      <svg
        width="23"
        height="25"
        viewBox="0 0 23 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.7 19.55H2.3C1.035 19.55 0 20.585 0 21.85C0 23.115 1.035 24.15 2.3 24.15H20.7C21.965 24.15 23 23.115 23 21.85C23 20.585 21.965 19.55 20.7 19.55Z"
          :fill="color"
        />
        <path
          d="M5.87637 16.1C6.42837 16.1 6.92287 15.755 7.09537 15.2375L8.25687 11.983H14.7544L15.8929 15.226C16.0769 15.755 16.5714 16.1 17.1234 16.1C18.0319 16.1 18.6529 15.1915 18.3309 14.352L13.4434 1.3455C13.1444 0.5405 12.3624 0 11.4999 0C10.6374 0 9.85537 0.5405 9.55637 1.3455L4.66887 14.352C4.34687 15.1915 4.97937 16.1 5.87637 16.1ZM11.4309 2.99H11.5689L13.9034 9.6485H9.09637L11.4309 2.99Z"
          fill="#404040"
        />
      </svg>
      <img src="@/assets/img/icons/develop-arrow.svg" />
    </v-btn>
    <transition name="slide-down">
      <v-color-picker
        v-if="dotClicked"
        class="color-picker"
        v-model="color"
        hide-inputs
        rounded="true"
        v-click-outside="() => (dotClicked = false)"
      ></v-color-picker>
    </transition>
  </div>
</template>

<script lang="ts">
import { ColorSelectorType } from "@/models/color";
import { defineComponent, PropType } from "vue";
import { VColorPicker } from "vuetify/components/VColorPicker";
import { VBtn } from "vuetify/lib/components/index.mjs";

export default defineComponent({
  name: "ColorManager",
  components: {
    VColorPicker,
    VBtn,
  },
  props: {
    pickerName: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
      default: "#1976D2",
      required: false,
    },
    inputType: {
      type: Object as PropType<ColorSelectorType>,
      default: ColorSelectorType.DOT,
      required: false,
    },
  },
  emits: ["update:modelValue"],
  computed: {
    color: {
      get(): string {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit("update:modelValue", value);
      },
    },
    isDotType(): boolean {
      return this.inputType === ColorSelectorType.DOT;
    },
    isBorderType(): boolean {
      return this.inputType === ColorSelectorType.BORDER;
    },
    isFontType(): boolean {
      return this.inputType === ColorSelectorType.FONT;
    },
  },
  data() {
    return {
      dotClicked: false as Boolean,
    };
  },
  mounted() {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        this.dotClicked = false;
      }
    });
  },
});
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.2s ease-in-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 500px; /* Adjust this value based on the content height */
}

.color-selector {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: start;
  gap: 0.8rem;
}

p {
  margin: auto;
  font-weight: 700;
}

.color-picker {
  position: absolute;
  z-index: 100;
  left: 100%;
  --animate-duration: 0.5s;
}
.clickable-dot {
  width: 1.5rem;
}
.clickable-dot:hover {
  cursor: pointer;
}
</style>
