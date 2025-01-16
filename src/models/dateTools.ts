import moment from 'moment'
import { DateableEvent, Schedule, ScheduleWithChoice, icsEvent } from './types'
import { datetime, RRule } from 'rrule'

export const getDateRange = (firstDate: Date, lastDate: Date): Array<Date> => {
  if (moment(firstDate, 'YYYY-MM-DD').isSame(moment(lastDate, 'YYYY-MM-DD'), 'day'))
    return [lastDate];
  let date = firstDate;
  const dates = [date];
  do {
    date = moment(date).add(1, 'day').toDate();
    dates.push(date);
  } while (moment(date).isBefore(lastDate));
  return dates;
};

export function generateCorrectDates(schedule: Schedule): Array<DateableEvent> | null {
  if (schedule.courses.start !== '') {
    const eventList = [] as Array<DateableEvent>
    const startSemester = new Date(schedule.courses.start);
    const endSemester = new Date(schedule.courses.end);
    if (Object.keys(schedule.rests).length === 0 || schedule.rests.length === 0) {
      eventList.push(...computePeriodsDates(startSemester, endSemester, schedule.schedule, true))
    } else if (schedule.rests.length === 1) {
      const startRest = new Date(schedule.rests[0].start)
      const endRest = new Date(schedule.rests[0].end)
      eventList.push(...computePeriodsDates(startSemester, startRest, schedule.schedule, true))
      eventList.push(...computePeriodsDates(endRest, endSemester, schedule.schedule))
    } else if (schedule.rests.length === 2) {
      const startRest1 = new Date(schedule.rests[0].start)
      const startRest2 = new Date(schedule.rests[1].start)
      const endRest1 = new Date(schedule.rests[0].end)
      const endRest2 = new Date(schedule.rests[1].end)
      eventList.push(...computePeriodsDates(startSemester, startRest1, schedule.schedule, true))
      eventList.push(...computePeriodsDates(endRest1, startRest2, schedule.schedule))
      eventList.push(...computePeriodsDates(endRest2, endSemester, schedule.schedule))
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
    console.log('dates : ', event.firstDate, event.lastDate);
    const recurrenceRule = new RRule({
      freq: RRule.WEEKLY,
      interval: event.frequency === 2 ? 2 : 1,
      wkst: RRule.MO,
      until: moment(event.lastDate).add(1, 'day').toDate(),
    })
    const dateStart = moment(new Date(event.firstDate)).format('YYYY-M-D-H-m').split('-').map((elem) => parseInt(elem))
    newEvent.start = [dateStart[0], dateStart[1], dateStart[2], dateStart[3], dateStart[4]]
    newEvent.duration = getHoursAndMinutesFromDuration(event.duration)
    newEvent.location = event.classroom
    newEvent.title = event.uv + ' - ' + event.type + event.group
    newEvent.description = 'Cours en ' + event.mode
    newEvent.recurrenceRule = recurrenceRule.toString().replace('RRULE:', '');
    icsEvents.push(newEvent)
  }
  return icsEvents
}

function computePeriodsDates(
  beginPeriod: Date,
  endPeriod: Date,
  coursesList: Array<ScheduleWithChoice>,
  isFirstPeriod = false
): Array<DateableEvent> {
  const eventList = [] as Array<DateableEvent>
  for (const scheduleItem of coursesList) {
    let firstDate: moment.Moment;
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
    if (scheduleItem.chosenDate !== null && typeof scheduleItem.chosenDate !== 'number') {
      const chosenDate = new Date(scheduleItem.chosenDate)
      if (isFirstPeriod) {
        firstDate = setHourToDate(scheduleItem.chosenDate, scheduleItem.startHour)
      } else {
        firstDate = findFirstDateDesync(beginPeriod, chosenDate, parseInt(scheduleItem.frequency) as 1 | 2)
        firstDate = setHourToDateM(firstDate, scheduleItem.startHour)
      }
    } else {
      console.error('it should never happen!');
      firstDate = findFirstDate(beginPeriod, scheduleItem.day)
      firstDate = setHourToDateM(firstDate, scheduleItem.startHour)
    }
    const lastDate = findLastDate(endPeriod, scheduleItem.day);
    console.log('first date: ',firstDate);

    newEvent.uv = scheduleItem.uv
    newEvent.type = scheduleItem.type
    newEvent.group = scheduleItem.group
    newEvent.firstDate = firstDate.format()
    newEvent.lastDate = lastDate.format()
    newEvent.frequency = parseInt(scheduleItem.frequency)
    newEvent.classroom = scheduleItem.classroom
    newEvent.mode = scheduleItem.mode
    newEvent.duration = diffHours(scheduleItem.startHour, scheduleItem.endHour)
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

export function hourToDecimal(hour: string) {
  const hourArray = hour.split(':').map((elem) => parseInt(elem))
  return hourArray[0] + hourArray[1] / 60
}

export function diffHours(hour1: string, hour2: string) {
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

function computeMonday(date: Date): moment.Moment {
  // return the monday of the week of the date
  if (moment(date).day() === 0) {
    // If the date is a sunday, we need to get the monday of the previous week
    return moment(date).day(-6).startOf('day');
  } else {
    // Else we take the monday of the current week
    return moment(date).day(1).startOf('day');
  }
}

function findFirstDateDesync(periodsBeginning: Date, firstOccurrenceDayDate: Date, freq: 1 | 2) {
  const periodsBeginning_M = moment(periodsBeginning);
  const firstOccurrenceDayDate_M = moment(firstOccurrenceDayDate);

  const periodsBeginningMonday = computeMonday(periodsBeginning);
  const firstOccurrenceDayDateMonday = computeMonday(firstOccurrenceDayDate);

  if (Math.abs(periodsBeginningMonday.week() - firstOccurrenceDayDateMonday.week()) < 2) {
    return firstOccurrenceDayDate_M
  } else {
    const nbWeeks = findNbWeeks(firstOccurrenceDayDateMonday, periodsBeginningMonday);
    // Discuss on the type of week (A or B)
    if (nbWeeks % 2 === 0 && freq === 2) {
      const firstDate = firstOccurrenceDayDate_M
      firstDate.week(periodsBeginningMonday.week() + 1)
      return firstDate
    } else {
      const firstDate = firstOccurrenceDayDate_M;
      // Additional check to see if the day of the course is after or before the periods beginning day
      if (
        !periodsBeginning_M.endOf('day').isBefore(periodsBeginningMonday.day(5).endOf('day')) ||
        (periodsBeginning_M.startOf('day').day()+6) % 7 < (firstOccurrenceDayDate_M.startOf('day').day()+6) % 7
      ) {
        if (freq === 2) {
          firstDate.week(periodsBeginningMonday.week() + 2);
        } else {
          firstDate.week(periodsBeginningMonday.week() + 1);
        }
      } else {
        firstDate.week(periodsBeginningMonday.week())
      }

      return firstDate
    }
  }
}

function findLastDate(endDate: Date, day: string) {
  const dayOfWeek = daysMap.get(day);
  const endDateM = moment(endDate);
  const endDateDay = endDateM.day();
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

export function getWeek(date: Date) {
  const dateM = moment(date);
  return dateM.week();
}

export const daysMap = new Map(
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
