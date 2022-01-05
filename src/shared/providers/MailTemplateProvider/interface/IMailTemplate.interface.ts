interface TemplateVariablesProps {
  [key: string]: string | number
}

export interface ParseMailProps {
  file: string
  variables: TemplateVariablesProps
}

export default interface IMailTemplate {
  parse(data: ParseMailProps): Promise<string>
}
