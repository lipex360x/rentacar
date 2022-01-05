import IMailTemplate from '../interface/IMailTemplate.interface'

export default class FakeMailTemplateProvider implements IMailTemplate {
  async parse (): Promise<string> {
    return 'mail content'
  }
}
