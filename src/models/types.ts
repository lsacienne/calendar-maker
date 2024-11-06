import { Color } from "./color"
import { Side } from "./svg-utils"

export type DateChooser = {
  id: number,
  uv: string,
  type: string,
  day: string,
  date1: Date | undefined,
  date2: Date | undefined,
  chosenDate: Date | number | null
}

export type SVGUvCourse = {
  uv: string,
  type: string,
  dayIdx: number,
  startHour: number,
  duration: number,
  side: Side,
  classroom: string,
  mode: string,
  group: string,
  fillColor: Color,
  strokeColor: Color,
  fontColor: Color,
  isSquared: boolean
}

export type UVCourses = {
  uv: string,
  courses: Array<Course>,
  fillColor: Color,
  strokeColor: Color,
  fontColor: Color,
  isSquared: boolean,
}

export type Course = {
  type: string,
  dayIdx: number,
  startHour: number,
  duration: number,
  side: Side,
  classroom: string,
  mode: string,
  group: string
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

export type IcsContainer = {
  events: Array<icsEvent>
}

export const frenchDays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
