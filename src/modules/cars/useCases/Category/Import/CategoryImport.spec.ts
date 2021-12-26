import Faker from 'faker'
import fs from 'fs'
import { writeToPath } from '@fast-csv/format'

import FakeCategoryRepository from '@modules/cars/repositories/fakes/FakeCategoryRepository'
import CategoryCreateService from '../Create/CategoryCreate.service'
import CategoryImportService from './CategoryImport.service'
import { json } from 'express'

let fakeCategoryRepository: FakeCategoryRepository
let categoryCreateService: CategoryCreateService
let categoryImportService: CategoryImportService

describe('Category Create', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    categoryImportService = new CategoryImportService(fakeCategoryRepository)
    categoryCreateService = new CategoryCreateService(fakeCategoryRepository)
  })

  it('should be able to list categories', async () => {
    const file = {} as Express.Multer.File

    // fs.writeFile('tmp/newfile.txt', 'Learn Node FS module', function (err) {
    //   if (err) throw err
    // })

    const path = 'tmp/people.csv'
    const data = [{ name: 'Stevie', id: 10 }, { name: 'Ray', id: 20 }]
    const options = { headers: true, quoteColumns: true }

    const csv = await readCsv(path, data, options)

    // await fs.promises.writeFile('tmp/people.csv', data, 'utf8')

    // writeToPath(path, data, options)
    //   .on('error', err => console.error(err))
    //   .on('finish', () => console.log('Done writing.'))
    // file.path = 'tmp/db2a69be3472bb616dcf4129433d18f3'

    // file = {
    //   fieldname: 'file',
    //   originalname: 'TestFile',
    //   encoding: '7bit',
    //   mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    //   destination: './tmp',
    //   filename: 'db2a69be3472bb616dcf4129433d18f3',
    //   path: 'tmp/db2a69be3472bb616dcf4129433d18f3',

    //   size: 628498
    // }

    // const getCategories = await categoryImportService.execute({ file })

    // expect(getCategories).toEqual(3)
  })
})

async function readCsv (path, data, options) {
  return new Promise((resolve, reject) => {
    writeToPath(path, data, options)
      .on('error', err => console.error(err))
      .on('finish', () => console.log('Done writing.'))
  })
}
