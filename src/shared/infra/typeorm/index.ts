import { createConnection, getConnectionOptions } from 'typeorm'

class OrmConnect {
  async execute () {
    const options = await getConnectionOptions()

    Object.assign(options, {
      connection: process.env.TYPEORM_CONNECTION
    })

    try {
      await createConnection(options)
      console.log('📚 Connected to database', options.database)
    } catch (error) {
      console.log('❌ Fail to Connect to database', options.database)
      process.exit()
    }
  }
}
export default new OrmConnect().execute()
