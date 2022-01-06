import { writeToPath } from '@fast-csv/format'
import ICsv, { WriteProps, ReadProps } from '../interface/ICsv.interface'

import { sanitize } from '@shared/utils/textTransform'

import { Readable } from 'stream'
import readLine from 'readline'

export default class FastCsvProvider implements ICsv {
  async write ({ path, data, delimiter = ';', headers = true }:WriteProps): Promise<number> {
    const options = { headers, delimiter }

    return new Promise((resolve, reject) => {
      writeToPath(path, data, options)
        .on('error', err => {
          console.error(err)
          reject(err)
        })
        .on('finish', () => {
          resolve(data.length)
        })
    })
  }

  async read ({ file, delimiter = ';', show_header = false }:ReadProps) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<any[]>(async (resolve, reject) => {
      const { buffer } = file

      const csv = []
      const data = []
      let header = []
      let count = 0

      const readableFile = new Readable()
      readableFile.push(buffer)
      readableFile.push(null)

      const csvLine = readLine.createInterface({
        input: readableFile
      })

      for await (const line of csvLine) {
        const lineArray = line.split(delimiter)
        csv.push(lineArray)
      }

      for await (let line of csv) {
        if (count === 0) {
          line = line.map((line: string) => sanitize(line))
          header = line
          data.push(header)
          count++
          continue
        }

        const lineInObject = line.reduce((result: Object, item: string, index: number) => {
          result[header[index]] = item
          return result
        }, {})

        data.push(lineInObject)
        count++
      }

      if (!show_header) data.shift()
      resolve(data)
    })
  }
}
