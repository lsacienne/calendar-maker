<template>
  <div class="color-selector">
    <p>{{ pickerName ?? "" }}</p>
    <svg
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
    <transition name="slide-down">
      <v-color-picker
        v-if="dotClicked"
        class="color-picker"
        v-model="color"
        hide-inputs
        v-click-outside="() => (dotClicked = false)"
      ></v-color-picker>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VColorPicker } from "vuetify/components/VColorPicker";

export default defineComponent({
  name: "ColorManager",
  components: {
    VColorPicker,
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
