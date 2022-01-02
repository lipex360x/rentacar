import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import IDateProvider from '../interface/IDate.interface'

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {
  dateNow (): Date {
    return dayjs().toDate()
  }

  addDays (days: number): Date {
    return dayjs().add(days, 'd').toDate()
  }

  addHours (hours: number): Date {
    return dayjs().add(hours, 'h').toDate()
  }

  addMinutes (minutes: number): Date {
    return dayjs().add(minutes, 'm').toDate()
  }

  convertToUTC (date: Date): string {
    return dayjs(date).utc().local().format()
  }

  compareInHours (start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date)
    const end_date_utc = this.convertToUTC(end_date)

    return dayjs(end_date_utc).diff(start_date_utc, 'hours')
  }
}

export default DayjsDateProvider
