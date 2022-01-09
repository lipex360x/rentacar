import { createConnection, getConnectionOptions } from 'typeorm'

class OrmConnect {
  static async execute () {
    const options = await getConnectionOptions()

    Object.assign(options, {
      connection: process.env.TYPEORM_CONNECTION
    })

    console.log('📡 Traying to connect to mongodb...')

    try {
      await createConnection(options)
      console.log('📚 Connected to database', options.database)
    } catch (error) {
      console.log('❌ Fail to Connect to database', options.database, error)
      process.exit()
    }
  }
}
export default OrmConnect
