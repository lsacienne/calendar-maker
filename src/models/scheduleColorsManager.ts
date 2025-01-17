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
    initialTimeSlotColorManagers: [] as TimeSlotUIManagerString[],
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
    },
    setInitialColorManager(): void {
        this.initialTimeSlotColorManagers = this.timeSlotColorManagers
            .map((timeSlotColorManager: TimeSlotUIManagerString) => {
                return {...timeSlotColorManager}
            });
    },
    resetAllColorManagers(): void {
        this.timeSlotColorManagers = this.initialTimeSlotColorManagers
            .map((timeSlotColorManager: TimeSlotUIManagerString) => {
                return {...timeSlotColorManager}
            });
    },
    resetColorManager(uvName: string): void {
        const index = this.timeSlotColorManagers.findIndex((timeSlotColorManager) => {
            return timeSlotColorManager.uvName === uvName;
        });
        if (index !== -1) {
            this.timeSlotColorManagers[index] = {...this.initialTimeSlotColorManagers[index]};
        }
    },
    getTimeSlotColorManager(uvName: string): TimeSlotUIManagerString | undefined {
        const index = this.timeSlotColorManagers.findIndex((timeSlotColorManager) => {
            return timeSlotColorManager.uvName === uvName;
        });
        if (index !== -1) {
            return this.timeSlotColorManagers[index];
        }
        return undefined;
    }
});