import { createConnections } from 'typeorm'
import promiseRetry from '@shared/utils/promiseRetry'

class OrmConnect {
  async execute () {
    try {
      const connect = await createConnections()
      const { options } = connect[0]

      console.log(`Connected to database ${options.database}`)
    } catch (error) {
      return promiseRetry({
        maxAttempt: 5,
        terminalMessage: `Trying to connect to database - ${error}`,
        timeToRetry: 2000,
        functionRetry: () => { return this.execute() }
      })
    }
  }
}

export default new OrmConnect().execute()
