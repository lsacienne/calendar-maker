import { createVuetify } from "vuetify";
import { VColorPicker } from "vuetify/components/VColorPicker";
import { ClickOutside, Ripple } from "vuetify/directives";
import { VDateInput } from "vuetify/labs/VDateInput";

const vuetify = createVuetify({
  locale: {
    locale: 'fr'
  },
  components: {
    VColorPicker,
    VDateInput,
  },
  directives: {
    Ripple,
    ClickOutside
  },
});

export default vuetify;
