import { container } from 'tsyringe'

import ICsvProvider from '../interface/ICsv.interface'
import FastCsvProvider from '../implementations/FastCsv.implementation'

container.registerSingleton<ICsvProvider>(
  'CsvProvider',
  FastCsvProvider
)

export default container
