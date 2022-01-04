import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import IDate, { ConvertProps, AddSubtractProps, CompareDatesProps } from '../interface/IDate.interface'

dayjs.extend(utc)

class DayjsDateProvider implements IDate {
  dateNow (): Date {
    return dayjs().toDate()
  }

  convertToUTC ({ date }: ConvertProps): string {
    return dayjs(date).utc().local().format()
  }

  addTime ({ time, unit }: AddSubtractProps): Date {
    return dayjs().add(time, unit).toDate()
  }

  subtractTime ({ time, unit }: AddSubtractProps): Date {
    return dayjs().subtract(time, unit).toDate()
  }

  compareDates ({ start_date, end_date, unit }: CompareDatesProps): number {
    const start_date_utc = this.convertToUTC({ date: start_date })
    const end_date_utc = this.convertToUTC({ date: end_date })

    return dayjs(end_date_utc).diff(start_date_utc, unit)
  }
}

export default DayjsDateProvider
