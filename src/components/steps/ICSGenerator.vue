<template>
  <StepFolder
    :folderColor="folderColor"
    title="Etape 4: Générer votre emploi du temps en ICS"
  >
    <article>
      <header>
        Le fichier ICS vous permet d’intégrer votre emploi du temps directement
        dans votre logiciel de calendrier (Outlook, Google Agenda, ...)
        <br />Pour obtenir ce type de fichier, rentrez les dates clés du
        semestre
      </header>
      <div class="period-definition">
        <v-date-input
          clearable
          :bgColor="textAreaBgColor"
          :rounded="true"
          :base-color="textAreaBgColor"
          placeholder="jj/mm/aaaa"
          label="Début des cours*"
          variant="outlined"
          v-model="courseBeginning"
          @click:clear="courseBeginning = null"
        ></v-date-input>
        <v-date-input
          clearable
          :bgColor="textAreaBgColor"
          :rounded="true"
          :base-color="textAreaBgColor"
          placeholder="jj/mm/aaaa"
          label="Fin des cours*"
          variant="outlined"
          v-model="courseEnd"
          @click:clear="courseEnd = null"
          :disabled="isCourseEndDisabled"
        ></v-date-input>
      </div>
      <div class="first-week-definition">
        <p>
          Indiquez le type de semaine pour votre
          <strong>1ère semaine de cours</strong> :
        </p>
        <CompactClassChooser
          date1="A"
          date2="B"
          @dateAChange="firstWeekType = 'A'"
          @dateBChange="firstWeekType = 'B'"
        ></CompactClassChooser>
      </div>
      <div class="holidays-definition">
        <p>🏖️ Enfin, indiquez votre/vos période(s) de vacances (facultatif):</p>
        <div class="period-definition">
          <v-date-input
            clearable
            :bgColor="textAreaBgColor"
            :rounded="true"
            :base-color="textAreaBgColor"
            placeholder="jj/mm/aaaa"
            label="1ere période de vacances"
            multiple="range"
            variant="outlined"
            v-model="firstHolidays"
            :disabled="isCourseEndDisabled"
            @click:clear="firstHolidays = null"
          ></v-date-input>
          <v-date-input
            clearable
            :bgColor="textAreaBgColor"
            :rounded="true"
            :base-color="textAreaBgColor"
            placeholder="jj/mm/aaaa"
            label="2ème période de vacances"
            multiple="range"
            variant="outlined"
            v-model="secondHolidays"
            :disabled="isSecondHolidaysDisabled"
            @click:clear="secondHolidays = null"
          ></v-date-input>
        </div>
      </div>
      <SubmitButton
        text="📅 Générer le fichier ICS"
        v-on:click="computeICSFile"
      ></SubmitButton>
    </article>
  </StepFolder>
</template>
<script lang="ts">
import { compileToFunction, defineComponent } from "vue";
import StepFolder from "../containers/StepFolder.vue";
import { Color } from "@/models/color";
import { VDateInput } from "vuetify/lib/labs/components.mjs";
import { createToaster } from "@meforma/vue-toaster";
import CompactClassChooser from "../class_chooser_components/CompactClassChooser.vue";
import SubmitButton from "../form_components/SubmitButton.vue";

const toaster = createToaster();
const dayLength = 24 * 60 * 60 * 1000;

export default defineComponent({
  name: "ICSGenerator",
  components: {
    StepFolder,
    VDateInput,
    CompactClassChooser,
    SubmitButton,
  },
  data() {
    return {
      folderColor: Color.fromHex("C2DEF7").toIColor(),
      firstWeekType: "" as "A" | "B" | "",
      courseBeginning: null as Date | null,
      courseEnd: null as Date | null,
      firstHolidays: null as Date[] | null,
      secondHolidays: null as Date[] | null,
    };
  },
  methods: {
    showCourseBegError() {
      toaster.show(
        "Vous ne pouvez pas choisir une date antérieure au début des cours ! 📆",
        {
          position: "bottom",
          duration: 2000,
          queue: true,
        }
      );
    },
    showCourseEndError() {
      toaster.show(
        "Les vacances ne peuvent pas finir après la fin des cours ! 📆",
        {
          position: "bottom",
          duration: 2000,
          queue: true,
        }
      );
    },
    showHolidaysLengthError() {
      toaster.show("La période de vacances doit durer au moins 5 jours ! 📆", {
        position: "bottom",
        duration: 2000,
        queue: true,
      });
    },
    showHolidaysOrderError() {
      toaster.show(
        "La deuxième période de vacances doit se dérouler après la première ! 📆",
        {
          position: "bottom",
          duration: 2000,
          queue: true,
        }
      );
    },
    showMissingInputsError() {
      toaster.show(
        "Veuillez remplir la date de début et de fin des cours ! 📆",
        {
          position: "bottom",
          duration: 2000,
          queue: true,
        }
      );
    },
    showMissingWeekTypeError() {
      toaster.show(
        "Veuillez choisir le type de semaine de la première semaine ! 📆",
        {
          position: "bottom",
          duration: 2000,
          queue: true,
        }
      );
    },
    verifyInputsCorrectness() {
      if (this.courseBeginning === null || this.courseEnd === null) {
        this.showMissingInputsError();
        return false;
      }
      if (this.firstWeekType === "") {
        this.showMissingWeekTypeError();
        return false;
      }
      return true;
    },
    computeICSFile() {
      if (!this.verifyInputsCorrectness()) {
        return;
      }
      console.log("Computing ICS file");
    },
  },
  computed: {
    textAreaBgColor(): string {
      return Color.fromIColor(this.folderColor).lightenColor(0.5).toHexString();
    },
    isSecondHolidaysDisabled(): boolean {
      return this.firstHolidays === null || this.firstHolidays.length <= 1;
    },
    isCourseEndDisabled(): boolean {
      return this.courseBeginning === null;
    },
  },
  watch: {
    courseBeginning: function (val) {
      if (val === null) {
        this.courseEnd = null;
        this.firstHolidays = null;
      } else if (
        this.courseEnd !== null &&
        this.courseEnd.getTime() < val.getTime()
      ) {
        this.courseEnd = null;
      }
      if (
        this.firstHolidays !== null &&
        val.getTime() > this.firstHolidays.at(0)!.getTime()
      ) {
        this.firstHolidays = null;
      }
    },
    courseEnd: function (val) {
      if (
        val !== null &&
        this.courseBeginning !== null &&
        val.getTime() < this.courseBeginning.getTime()
      ) {
        this.courseEnd = null;
        this.showCourseBegError();
      } else if (val !== null) {
        if (
          this.firstHolidays !== null &&
          val.getTime() + dayLength < this.firstHolidays.at(-1)!.getTime()
        ) {
          this.firstHolidays = null;
        }
        if (
          this.secondHolidays !== null &&
          val.getTime() + dayLength < this.secondHolidays.at(-1)!.getTime()
        ) {
          this.secondHolidays = null;
        }
      }
    },
    firstHolidays: function (val) {
      if (
        val !== null &&
        this.courseBeginning !== null &&
        val[0].getTime() < this.courseBeginning.getTime()
      ) {
        this.firstHolidays = null;
        this.showCourseBegError();
      } else if (
        val !== null &&
        this.courseEnd !== null &&
        this.courseEnd.getTime() + dayLength < val.at(-1).getTime()
      ) {
        console.log(this.courseEnd, val.at(-1));
        this.firstHolidays = null;
        this.showCourseEndError();
      }
      if (this.firstHolidays === null) {
        this.secondHolidays = null;
      } else if (this.firstHolidays.length < 5) {
        this.firstHolidays = null;
        this.secondHolidays = null;
        this.showHolidaysLengthError();
      }
    },
    secondHolidays: function (val) {
      if (val !== null && this.firstHolidays !== null) {
        if (this.firstHolidays.at(-1)!.getTime() > val[0].getTime()) {
          this.secondHolidays = null;
          this.showHolidaysOrderError();
        } else if (
          this.courseEnd !== null &&
          val.at(-1).getTime() > this.courseEnd.getTime() + dayLength
        ) {
          this.secondHolidays = null;
          this.showCourseEndError();
        } else if (val.length < 5) {
          this.secondHolidays = null;
          this.showHolidaysLengthError();
        }
        console.log("second holidays", val);
      }
    },
  },
});
</script>
<style lang="css" scoped>
article {
  margin: 1.5rem;
  margin-top: 2rem;
}

header {
  font-size: 1em;
  text-align: justify;
}

.period-definition {
  display: inline-flex;
  justify-content: space-evenly;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;
}

.first-week-definition {
  display: inline-flex;
  width: 100%;
  gap: 1rem;
  justify-content: start;
  margin-top: 1rem;
}

.holidays-definition {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  align-items: start;
  margin-top: 1rem;
}
</style>
