<template>
  <article>
    <h1>3. Télécharges 💾 & Personnalises ! 🎨</h1>
    <div class="ics-container">
      <p>💾 Télécharges ton fichier ICS et importes le sur ton agenda !</p>
      <input type="text" name="" id="" v-model="filename" />
      <a :href="icsURL" :download="filenameComp">
        <button>ICS File 📆</button>
      </a>
    </div>
    <SVGSchedule :nb-days="5"></SVGSchedule>
    <!-- CanvasSchedule></CanvasSchedule -->
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CanvasSchedule from "./custom_schedule_components/CanvasSchedule.vue";
import SVGSchedule from "./custom_schedule_components/SVGSchedule.vue";
import { icsEvent } from "@/models/types";
import { createEvents } from "ics";

export default defineComponent({
  name: "CustomSchedule",
  components: {
    SVGSchedule,
  },
  data() {
    return {
      icsURL: "#",
      filename: "agenda.ics",
    };
  },
  computed: {
    filenameComp() {
      if (this.filename.endsWith(".ics")) {
        return this.filename;
      }
      return this.filename + ".ics";
    },
  },
  props: {
    icsData: {
      required: false,
      type: Array as PropType<Array<icsEvent>>,
      default: undefined,
    },
  },
  watch: {
    icsData() {
      this.generateURL();
    },
  },
  methods: {
    async generateURL() {
      if (this.icsData !== undefined) {
        const filename = "agenda.ics";
        const file = await this.createFilePromise(filename, this.icsData);
        this.icsURL = URL.createObjectURL(file);
      } else {
        this.icsURL = "#";
      }
    },
    createFilePromise(
      filename: string,
      icsData: Array<icsEvent>
    ): Promise<File> {
      return new Promise((resolve, reject) => {
        const returnObject = createEvents(icsData);
        if (returnObject.error) {
          reject(returnObject.error);
        }
        console.log(returnObject.value);
        if (returnObject.value !== undefined) {
          resolve(
            new File([returnObject.value], filename, { type: "text/calendar" })
          );
        }
      });
    },
  },
});
</script>

<style scoped>
article {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 216, 59, 0.5);
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 1rem;
}

article.invisible {
  display: none;
}

h1 {
  margin-left: 4rem;
  align-self: flex-start;
}

.ics-container {
  width: 95%;
  padding: 1rem;
  display: inline-flex;
  background-color: rgb(230, 195, 116);
  border-radius: inherit;
  align-items: center;
  justify-content: space-between;
}

.ics-container p {
  font-size: 1.2rem;
}

a {
  color: inherit;
}

button {
  color: inherit;
  align-self: center;
  padding: 0.5rem;
  font-size: 1.5rem;
  border-radius: 0.7rem;
  background-color: rgb(164, 139, 187);
  border: solid rgb(88, 36, 136) 0.2rem;
  transition: background-color 0.3s, color 0.2s, border 0.1s;
}

button:hover {
  background-color: rgb(88, 36, 136);
  color: aliceblue;
}

button:active {
  border: solid rgb(125, 110, 139) 0.2rem;
  background-color: rgb(125, 110, 139);
  color: aliceblue;
}
</style>
