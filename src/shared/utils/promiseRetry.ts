import getCallerFile from 'get-caller-file'
import tracer from 'tracer'
import colors from 'colors'

interface ExecuteProps {
  maxAttempt:number | 'Infinity',
  timeToRetry: number,
  terminalMessage:string,
  functionRetry: any
}

const logger = tracer.colorConsole({
  level: 'log',
  filters: {
    warn: colors.yellow,
    error: [colors.red.bold]
  },

  format: '{{message}}'
})

let count = 0

/**
 * Tenta executar uma promise uma certa quantidade de vezes ou até que ela seja resolvida
 * @param {Object} promise
 * @param {number} maxAttempt Máximo de tentativas de execução da função
 * @param {number} timeToRetry Tempo em milisegundos para nova tentativa
 * @param {string} terminalMessage Mensagem de Exibição no Terminal
 * @param {Function} functionRetry Função rechamada: ( ) => { return this.function() }
 */
export default async function execute ({ maxAttempt, timeToRetry, terminalMessage, functionRetry }:ExecuteProps) {
  const filePath = getCallerFile()

  setTimeout(async () => {
    try {
      if (terminalMessage) {
        logger.warn(`${filePath} ${functionRetry}`)
        logger.warn(`${terminalMessage} - attempt ${count} of ${maxAttempt} \n`)
      }

      if (maxAttempt !== Infinity && count >= maxAttempt) {
        logger.error('Maximum attempts reached \n')
        process.exit()
      }
      return functionRetry()
    } catch (error) {
      return execute({ maxAttempt, timeToRetry, terminalMessage, functionRetry })
    }
  }, timeToRetry)

  count++
}
