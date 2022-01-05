import handlebars from 'handlebars'
import fs from 'fs'

import IMailTemplate, { ParseMailProps } from '../interface/IMailTemplate.interface'

export default class HandlebarsProvider implements IMailTemplate {
  async parse ({ file, variables }: ParseMailProps): Promise<string> {
    const templateFile = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })
    const parseTemplate = handlebars.compile(templateFile)

    return parseTemplate(variables)
  }
}
