<template>
  <header
    :style="{
      color: _textColor,
      background: _backgroundColor,
      boxShadow: `15px 15px 0px ${_shadowColor}`,
    }"
  >
    <h1>Calendar Maker</h1>
    <div
      class="content"
      :style="{
        borderColor: _textColor,
      }"
    >
      <p>
        Bienvenue sur Calendar Maker. Ici, vous allez pouvoir visualiser
        <strong>facilement</strong> et <strong>rapidement</strong> votre emploi
        du temps de vos cours à l’<strong>UTBM</strong>. L’application va vous
        permettre dans un premier temps de visualiser votre emploi du temps au
        format <strong>PNG</strong>. Si ça vous intéresse, vous pourrez ensuite
        convertir cet emploi du temps en fichier <strong>ICS</strong> pour que
        vous puissiez directement le voir dans votre application d’agenda
        préférée (Outlook, Google Agenda, etc.).
      </p>
      <p>
        Quand vous êtes prêt, commencez à coller votre emploi du temps
        ci-dessous !
      </p>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Color } from "@/models/color";

export default defineComponent({
  name: "PageTitleContainer",
  components: {},
  data() {
    return {
      mainColor: Color.fromHex("#FFFFFF").toIColor(),
      textColor: Color.fromHex("#232121").toIColor(),
    };
  },
  computed: {
    _shadowColor(): string {
      return Color.fromIColor(this.mainColor).darkenColor(0.5).toHexString();
    },
    _backgroundColor(): string {
      return Color.fromIColor(this.mainColor).toHexString();
    },
    _textColor(): string {
      return Color.fromIColor(this.textColor).toHexString();
    },
  },
});
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2em;
  padding-top: 1em;

  border-radius: 15px;
}

h1 {
  font-size: 6em;
  font-weight: normal;
}

.content {
  font-size: 1.2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  text-align: justify;

  align-self: center;
  padding-left: 1em;
  padding-right: 1em;
  border-left: solid 5px;
}
</style>
