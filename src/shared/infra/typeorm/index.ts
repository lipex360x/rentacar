import { createConnection, getConnectionOptions } from 'typeorm'

class OrmConnect {
  async execute (): Promise<boolean> {
    const options = await getConnectionOptions()

    Object.assign(options, {
      connection: process.env.TYPEORM_CONNECTION
    })

    console.log('\n📡 Traying to connect to postgres...')

    try {
      await createConnection()
      console.log('📚 Connected to database postgres')
      return true
    } catch (error) {
      console.log('❌ Fail to Connect to postgres', error)
      process.exit()
    }
  }
}
export default new OrmConnect()
