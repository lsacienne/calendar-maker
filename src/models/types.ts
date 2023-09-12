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
    chosenDate: Date | number | null
}

export type ShceduleItem = {
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

export const frenchDays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
