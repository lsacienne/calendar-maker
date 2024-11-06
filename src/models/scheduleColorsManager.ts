import { reactive } from "vue";
import { Color, TimeSlotUIManager, TimeSlotUIManagerString } from "./color";

export const scheduleColorsManager = reactive({
    timeSlotColorManagers: [] as TimeSlotUIManagerString[],
    initialized: false as Boolean,
    addTimeSlotColorManager(timeSlotColorManager: TimeSlotUIManagerString) {
        this.timeSlotColorManagers.push(timeSlotColorManager);
        this.initialized = true;
    },
    toColorManagers(): TimeSlotUIManager[] {
        return this.timeSlotColorManagers.map((timeSlotColorManager) => {
            return {
                uvName: timeSlotColorManager.uvName,
                backgroundColor: Color.fromHex(timeSlotColorManager.backgroundColor),
                mainColor: Color.fromHex(timeSlotColorManager.mainColor),
                fontColor: Color.fromHex(timeSlotColorManager.fontColor),
                isSquared: timeSlotColorManager.isSquared
            }
        });
    }
});