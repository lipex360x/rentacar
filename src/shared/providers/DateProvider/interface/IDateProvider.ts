export default interface IDateProvider {
  dateNow(): Date
  addDays(days: number): Date
  addHours(hours: number): Date
  addMinutes(minutes: number): Date
  convertToUTC(date: Date): string
  compareInHours(start_date: Date, end_date: Date): number
}
