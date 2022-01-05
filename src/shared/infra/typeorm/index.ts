import { createConnection, getConnectionOptions } from 'typeorm'

class OrmConnect {
  async execute () {
    const options = await getConnectionOptions()

    Object.assign(options, {
      connection: process.env.TYPEORM_CONNECTION
    })

    try {
      await createConnection()

      const mongo = await createConnection({
        name: 'mongo',
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'rentex',
        entities: ['src/modules/**/schemas/*.ts'],
        useUnifiedTopology: true
      })

      console.log('📚 Connected to database', options.database)
      console.log('📚 Connected to database', mongo.name)
    } catch (error) {
      console.log('❌ Fail to Connect to databases', error)
      process.exit()
    }
  }
}
export default new OrmConnect().execute()
