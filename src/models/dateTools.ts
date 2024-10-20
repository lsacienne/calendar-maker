import moment from 'moment'
import { DateableEvent, Schedule, ScheduleWithChoice, icsEvent } from './types'
import { RRule } from 'rrule'

export function generateCorrectDates(schedule: Schedule): Array<DateableEvent> | null {
  if (schedule.courses.start !== '') {
    const eventList = [] as Array<DateableEvent>
    const startSemester = new Date(schedule.courses.start)
    const endSemester = new Date(schedule.courses.end)
    if (Object.keys(schedule.rests).length === 0 || schedule.rests.length === 0) {
      eventList.push(...generateDateForPeriod(startSemester, endSemester, schedule.schedule, true))
    } else if (schedule.rests.length === 1) {
      const startRest = new Date(schedule.rests[0].start)
      const endRest = new Date(schedule.rests[0].end)
      eventList.push(...generateDateForPeriod(startSemester, startRest, schedule.schedule, true))
      eventList.push(...generateDateForPeriod(endRest, endSemester, schedule.schedule))
    } else if (schedule.rests.length === 2) {
      const startRest1 = new Date(schedule.rests[0].start)
      const startRest2 = new Date(schedule.rests[1].start)
      const endRest1 = new Date(schedule.rests[0].end)
      const endRest2 = new Date(schedule.rests[1].end)
      eventList.push(...generateDateForPeriod(startSemester, startRest1, schedule.schedule, true))
      eventList.push(...generateDateForPeriod(endRest1, startRest2, schedule.schedule))
      eventList.push(...generateDateForPeriod(endRest2, endSemester, schedule.schedule))
    }
    return eventList
  }
  return null
}

export function generateICSObjects(events: Array<DateableEvent>) {
  const icsEvents = [] as Array<icsEvent>
  for (const event of events) {
    const newEvent: icsEvent = {
      start: [0, 0, 0, 0, 0],
      duration: {
        hours: 0,
        minutes: 0
      },
      title: '',
      description: '',
      location: '',
      recurrenceRule: ''
    }
    const recurrenceRule = new RRule({
      freq: RRule.WEEKLY,
      interval: event.frequency === 2 ? 2 : 1,
      dtstart: new Date(event.firstDate),
      until: new Date(event.lastDate)
    })
    const dateStart = moment(new Date(event.firstDate)).format('YYYY-M-D-H-m').split('-').map((elem) => parseInt(elem))
    newEvent.start = [dateStart[0], dateStart[1], dateStart[2], dateStart[3], dateStart[4]]
    newEvent.duration = getHoursAndMinutesFromDuration(event.duration)
    newEvent.location = event.classroom
    newEvent.title = event.uv + ' - ' + event.type + event.group
    newEvent.description = 'Cours en ' + event.mode
    newEvent.recurrenceRule = recurrenceRule.toString()
    icsEvents.push(newEvent)
  }
  return icsEvents
}

function generateDateForPeriod(
  beginPeriod: Date,
  endPeriod: Date,
  coursesList: Array<ScheduleWithChoice>,
  isFirstPeriod = false
): Array<DateableEvent> {
  const eventList = [] as Array<DateableEvent>
  for (const item of coursesList) {
    let firstDate: moment.Moment
    const newEvent: DateableEvent = {
      uv: '',
      type: '',
      group: '',
      firstDate: '',
      lastDate: '',
      duration: 0,
      frequency: 0,
      classroom: '',
      mode: ''
    }
    if (item.chosenDate !== null && typeof item.chosenDate !== 'number') {
      const chosenDate = new Date(item.chosenDate)
      if (isFirstPeriod) {
        firstDate = setHourToDate(item.chosenDate, item.startHour)
      } else {
        firstDate = findFirstDateDesync(beginPeriod, chosenDate)
        firstDate = setHourToDateM(firstDate, item.startHour)
      }
    } else {
      firstDate = findFirstDate(beginPeriod, item.day)
      firstDate = setHourToDateM(firstDate, item.startHour)
    }
    const lastDate = findLastDate(endPeriod, item.day)

    newEvent.uv = item.uv
    newEvent.type = item.type
    newEvent.group = item.group
    newEvent.firstDate = firstDate.format()
    newEvent.lastDate = lastDate.format()
    newEvent.frequency = parseInt(item.frequency)
    newEvent.classroom = item.classroom
    newEvent.mode = item.mode
    newEvent.duration = diffHours(item.startHour, item.endHour)
    eventList.push(newEvent)
  }
  return eventList
}

function getHoursAndMinutesFromDuration(duration: number): {
  hours: number, minutes: number
} {
  const durationM = moment.duration(duration, 'm')
  return {
    hours: durationM.hours(),
    minutes: durationM.minutes()
  }
}

function setHourToDate(date: Date, stringHour: string): moment.Moment {
  const hourArray = stringHour.split(':').map((elem) => parseInt(elem))
  const dateMoment = moment(date)
  dateMoment.set({ hour: hourArray[0], minutes: hourArray[1] })
  return dateMoment
}

function setHourToDateM(date: moment.Moment, stringHour: string): moment.Moment {
  const hourArray = stringHour.split(':').map((elem) => parseInt(elem))
  date.set({ hour: hourArray[0], minutes: hourArray[1] })
  return date
}

function diffHours(hour1: string, hour2: string) {
  const hour1A = hour1.split(':').map((elem) => parseInt(elem))
  const hour2A = hour2.split(':').map((elem) => parseInt(elem))
  const hour1M = moment()
  const hour2M = moment()
  hour1M.set({ hour: hour1A[0], minute: hour1A[1] })
  hour2M.set({ hour: hour2A[0], minute: hour2A[1] })
  return hour2M.diff(hour1M, 'minutes')
}

function findNbWeeks(date1: moment.Moment, date2: moment.Moment) {
  const duration = moment.duration(date2.diff(date1))
  return duration.asWeeks()
}

function findFirstDate(beginDate: Date, day: string) {
  const dayOfWeek = daysMap.get(day)
  const beginDateM = moment(beginDate)
  const beginDateDay = beginDateM.day()
  if (dayOfWeek !== undefined) {
    if (beginDateDay > dayOfWeek) {
      beginDateM.day(7 + dayOfWeek)
    } else {
      beginDateM.day(dayOfWeek)
    }
    return beginDateM
  }
  return moment()
}

function findFirstDateDesync(beginDate: Date, originDate: Date) {
  const beginDateM = moment(beginDate)
  const originDateM = moment(originDate)
  if (Math.abs(beginDateM.week() - originDateM.week()) < 2) {
    return originDateM
  } else {
    let firstMonday: moment.Moment
    if (beginDateM.day() >= 5) {
      firstMonday = beginDateM.day(1 + 7)
    } else {
      firstMonday = beginDateM.day(1)
    }
    const nbWeeks = findNbWeeks(originDateM, firstMonday)
    if (nbWeeks % 2 === 0) {
      const firstDate = originDateM
      firstDate.week(firstMonday.week() + 1)
      return firstDate
    } else {
      const firstDate = originDateM
      firstDate.week(firstMonday.week())
      return firstDate
    }
  }
}

function findLastDate(endDate: Date, day: string) {
  const dayOfWeek = daysMap.get(day)
  const endDateM = moment(endDate)
  const endDateDay = endDateM.day()
  if (dayOfWeek !== undefined) {
    if (endDateDay <= dayOfWeek) {
      endDateM.day(dayOfWeek - 7)
    } else {
      endDateM.day(dayOfWeek)
    }
    return endDateM
  }
  return moment()
}

const daysMap = new Map(
  [
    ['lundi', 1],
    ['mardi', 2],
    ['mercredi', 3],
    ['jeudi', 4],
    ['vendredi', 5],
    ['samedi', 6],
    ['dimanche', 0]
  ]
)
