<template>
  <StepFolder
    title="Etape 1 : Collez votre emploi du temps"
    :folder-color="folderColor"
  >
    <article class="folder-content">
      <img src="@/assets/img/masking-tape.svg" alt="" class="tape top-right" />
      <img
        src="@/assets/img/masking-tape.svg"
        alt=""
        class="tape bottom-left"
      />
      <v-textarea
        class="text-area"
        ref="scheduleArea"
        label="Collez votre emploi du temps ici"
        variant="outlined"
        :noResize="true"
        rows="15"
        :bgColor="textAreaBgColor"
        :rounded="true"
        :base-color="textAreaBgColor"
        density="comfortable"
        :autoGrow="true"
      >
      </v-textarea>
      <SubmitButton text="J'ai fini 😎" v-on:click="sendData"></SubmitButton>
    </article>
  </StepFolder>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DateContainer from "@/components/form_components/DateContainer.vue";
import DateField from "@/components/form_components/DateField.vue";
import SubmitButton from "@/components/form_components/SubmitButton.vue";
import { createToaster } from "@meforma/vue-toaster";
import { ScheduleItem, frenchDays } from "@/models/types";
import { VDateInput } from "vuetify/lib/labs/components.mjs";
import { Color } from "@/models/color";
import { VTextarea } from "vuetify/lib/components/index.mjs";
import StepFolder from "@/components/containers/StepFolder.vue";

const toaster = createToaster();

export default defineComponent({
  name: "UserData",
  components: {
    DateField,
    DateContainer,
    SubmitButton,
    VDateInput,
    VTextarea,
    StepFolder,
  },
  data() {
    return {
      folderColor: Color.fromHex("BCF6C5").toIColor(),
    };
  },
  computed: {
    textAreaBgColor(): string {
      return Color.fromIColor(this.folderColor).lightenColor(0.5).toHexString();
    },
    textAreaColor(): string {
      return Color.fromIColor(this.folderColor).darkenColor(0.8).toHexString();
    },
  },
  methods: {
    sendData(): {
      courses: { start: string; end: string };
      schedule: Array<object>;
      rests: Array<{ start: string; end: string }>;
    } | null {
      const scheduleArea = this.$refs.scheduleArea as HTMLTextAreaElement;

      const courses = {
        start: "",
        end: "",
      };

      const scheduleStr = scheduleArea.value;
      const schedule = scheduleStr
        .split("\n")
        .map((line) => line.split(/ *\t+/)) as Array<Array<string>>;
      const scheduleTable = [] as Array<ScheduleItem>;

      for (const line of schedule) {
        let startHourSet = false;
        const resultObject: ScheduleItem = {
          uv: "",
          type: "",
          day: "",
          startHour: "",
          endHour: "",
          frequency: "",
          classroom: "",
          mode: "",
          group: "",
        };
        line.forEach((value, i) => {
          if (i === 0) {
            if (value.includes("+")) {
              resultObject.uv = value.split("+")[0];
            } else {
              resultObject.uv = value;
            }
          } else if (/(TD|TP|CM)[0-9]/.test(value)) {
            resultObject.type = value;
          } else if (frenchDays.includes(value)) {
            resultObject.day = value;
          } else if (/[A-Z]/g.test(value) && value.length === 1) {
            resultObject.group = value;
          } else if (/[0-9]{2}:[0-9]{2}/.test(value)) {
            if (!startHourSet) {
              resultObject.startHour = value;
            } else {
              resultObject.endHour = value;
            }
            startHourSet = true;
          } else if (/[1-2]/.test(value) && value.length === 1) {
            resultObject.frequency = value;
          } else if (value.match(/(Présentiel|Distanciel)/g)) {
            resultObject.mode = value;
          } else {
            resultObject.classroom = value;
          }
        });
        // Because sometimes a clever professor thinks it's funny to put a letter in the frequency column!
        // Thank you professor, very cool!
        if (resultObject.group !== "" && resultObject.frequency === "") {
          resultObject.frequency = "2";
        }

        scheduleTable.push(resultObject);
      }

      if (scheduleStr === "") {
        toaster.show("Colles ton emploi du temps chef ! 📆", {
          position: "bottom",
          duration: 2000,
          queue: true,
        });
        this.$emit("formValidated", null);
        return null;
      } else if (scheduleStr.indexOf("\t") === -1) {
        toaster.show(
          "Colles ton emploi du temps directement depuis le site ! ✂️",
          {
            position: "bottom",
            duration: 2000,
            queue: true,
          }
        );
        this.$emit("formValidated", null);
        return null;
      }

      const restArray: never[] = [];
      this.$emit("formValidated", {
        schedule: scheduleTable,
        courses: courses,
        rests: restArray,
      });
      console.log(scheduleTable);
      return {
        schedule: scheduleTable,
        courses: courses,
        rests: restArray,
      };
    },
  },
});
</script>

<style scoped>
.folder-content {
  display: flex;
  flex-direction: column;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: min(5rem, 10vw);
  position: relative;
  padding-bottom: 2rem;
}

.date-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  border-radius: 1rem;
  background-color: rgb(121, 121, 209, 0.6);
}

.tape {
  position: absolute;
  margin: auto;
  width: 13%;
  z-index: 10;
  aspect-ratio: 1 / 2;
}

.tape.top-right {
  top: min(5rem, 10vw);
  right: -1%;
  transform: translateX(-50%) translateY(-50%) rotate(40deg);
}

.tape.bottom-left {
  top: 80%;
  left: 10%;
  transform: translateX(-50%) translateY(-50%) rotate(50deg);
}
</style>
