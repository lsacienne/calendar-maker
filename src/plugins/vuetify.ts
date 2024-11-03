import { createVuetify } from "vuetify";
import { VColorPicker } from "vuetify/components/VColorPicker";
import { ClickOutside, Ripple } from "vuetify/directives";

const vuetify = createVuetify({
  components: {
    VColorPicker,
  },
  directives: {
    Ripple,
    ClickOutside
  },
});

export default vuetify;
