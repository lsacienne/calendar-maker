import { createVuetify } from "vuetify";
import { VColorPicker } from "vuetify/components/VColorPicker";
import { Ripple } from "vuetify/directives";

const vuetify = createVuetify({
  components: {
    VColorPicker,
  },
  directives: {
    Ripple,
  },
});

export default vuetify;
