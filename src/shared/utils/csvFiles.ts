import { writeToPath } from '@fast-csv/format'
import fs from 'fs'
import csvParse from 'csv-parse'

interface WriteCsvProps {
  path: string
  data: any[]
  delimiter?: ',' | ';'
  headers: boolean
}

interface ReadCsvProps {
  path: string
  delimiter?: ',' | ';'
}

async function writeCsv ({ path, data, delimiter = ';', headers = true }:WriteCsvProps) {
  const options = { headers, delimiter }

  return new Promise((resolve, reject) => {
    writeToPath(path, data, options)
      .on('error', err => {
        console.error(err)
        reject(err)
      })
      .on('finish', () => {
        console.log('Done writing.')
        resolve(true)
      })
  })
}

async function readCsv ({ path, delimiter = ';' }:ReadCsvProps): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const data = []

    const stream = fs.createReadStream(path, { encoding: 'binary' })

    const parseFile = csvParse({ delimiter })

    stream.pipe(parseFile)

    parseFile
      .on('data', async (line) => {
        const [name, description] = line
        data.push({ name, description })
      })
      .on('end', () => { resolve(data) })
      .on('error', (error) => { reject(error) })
  })
}

export { writeCsv, readCsv }
