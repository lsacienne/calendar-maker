import { reactive } from "vue";
import { Color, TimeSlotUIManager, TimeSlotUIManagerString } from "./color";

export interface GeneralSettings {
    scheduleName: string;
    linesColor: string;
    linesEnabled: boolean;
    backgroundColor: string;
    backgroundEnabled: boolean;
    hourLabelsColors: string;
    daysLabelsColors: string;
}

export const scheduleColorsManager = reactive({
    timeSlotColorManagers: [] as TimeSlotUIManagerString[],
    generalSettings: {
        scheduleName: "agenda.png",
        linesColor: "#4a4646",
        linesEnabled: true,
        backgroundColor: "#f5f5f5",
        backgroundEnabled: true,
        hourLabelsColors: "#4a4646",
        daysLabelsColors: "#4a4646"
    } as GeneralSettings,
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