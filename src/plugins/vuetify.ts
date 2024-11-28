import { createVuetify } from "vuetify";
import { VColorPicker } from "vuetify/components/VColorPicker";
import { ClickOutside, Ripple } from "vuetify/directives";
import { VDateInput } from "vuetify/labs/VDateInput";
import { VBtn, VTextarea } from "vuetify/lib/components/index.mjs";
import 'vuetify/styles'

const vuetify = createVuetify({
  ssr: true,
  locale: {
    locale: 'fr'
  },
  components: {
    VColorPicker,
    VDateInput,
    VTextarea,
    VBtn
  },
  directives: {
    Ripple,
    ClickOutside
  },
});

export default vuetify;
