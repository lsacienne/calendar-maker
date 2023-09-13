export type DateChooser = {
    id: number,
    uv: string,
    type: string,
    day: string,
    date1: Date | undefined,
    date2: Date | undefined,
    chosenDate: Date | number | null
}

export type ScheduleWithChoice = {
    uv: string,
    type: string,
    day: string,
    startHour: string,
    endHour: string,
    frequency: string,
    classroom: string,
    mode: string,
    group: string,
    chosenDate: Date | number | null
}

export type ScheduleItem = {
    uv: string,
    type: string,
    day: string,
    group: string,
    startHour: string,
    endHour: string,
    frequency: string,
    classroom: string,
    mode: string
}

export type Schedule = {
    courses: {
        start: string,
        end: string
    },
    rests: Array<{
        start: string,
        end: string
    }>,
    schedule: Array<ScheduleWithChoice>
}

export type DateableEvent = {
    uv: string,
    type: string,
    group: string,
    firstDate: string,
    lastDate: string,
    duration: number,
    frequency: number,
    classroom: string,
    mode: string
}

export type icsEvent = {
    start: [number, number, number, number, number],
    title: string,
    duration: {
        hours: number,
        minutes: number
    },
    description: string,
    location: string,
    recurrenceRule: string
}

export const frenchDays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
