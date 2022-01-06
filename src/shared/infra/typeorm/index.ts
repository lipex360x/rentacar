import { createConnection, getConnectionOptions } from 'typeorm'

class OrmConnect {
  async execute () {
    const options = await getConnectionOptions()

    Object.assign(options, {
      connection: process.env.TYPEORM_CONNECTION
    })

    try {
      await createConnection()
      console.log('📚 Connected to database postgres')
    } catch (error) {
      console.log('❌ Fail to Connect to postgres', error)
      process.exit()
    }
  }
}
export default new OrmConnect().execute()
