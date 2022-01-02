export interface CompareDatesProps {
  start_date: Date
  end_date: Date
  unit: 'day' | 'week' | 'month' | 'year' | 'hour' | 'minute' | 'second' | 'millisecond'
}

export interface AddSubtractProps {
  time: number
  unit: 'day' | 'week' | 'month' | 'year' | 'hour' | 'minute' | 'second' | 'millisecond'
}

export interface ConvertProps {
  date: Date
}

export default interface IDateProvider {
  dateNow(): Date
  convertToUTC(data: ConvertProps): string
  addTime(data: AddSubtractProps): Date
  subtractTime(data: AddSubtractProps): Date
  compareDates(data: CompareDatesProps): number
}
