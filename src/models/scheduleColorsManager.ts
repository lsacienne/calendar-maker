import { reactive } from "vue";
import { Color, TimeSlotColorManager, TimeSlotColorManagerString } from "./color";

export const scheduleColorsManager = reactive({
    timeSlotColorManagers: [] as TimeSlotColorManagerString[],
    initialized: false as Boolean,
    addTimeSlotColorManager(timeSlotColorManager: TimeSlotColorManagerString) {
        this.timeSlotColorManagers.push(timeSlotColorManager);
        this.initialized = true;
    },
    toColorManagers(): TimeSlotColorManager[] {
        return this.timeSlotColorManagers.map((timeSlotColorManager) => {
            return {
                uvName: timeSlotColorManager.uvName,
                backgroundColor: Color.fromHex(timeSlotColorManager.backgroundColor),
                borderColor: Color.fromHex(timeSlotColorManager.borderColor),
                fontColor: Color.fromHex(timeSlotColorManager.fontColor),
            }
        });
    }
});