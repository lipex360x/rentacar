import { container } from 'tsyringe'

import ICsv from '../interface/ICsv.interface'
import FastCsvProvider from '../implementations/FastCsv.implementation'

container.registerSingleton<ICsv>(
  'CsvProvider',
  FastCsvProvider
)

export default container
