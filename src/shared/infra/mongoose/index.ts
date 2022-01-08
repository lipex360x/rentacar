import mongoose from 'mongoose'

import mongoConfig from '@shared/config/mongo'

class MongoDbConnect {
  static async execute (): Promise<boolean> {
    const mongoUserPass = mongoConfig.username
      ? `${mongoConfig.username}:${mongoConfig.password}@`
      : ''

    console.log('\n📡 Traying to connect to mongodb...')

    try {
      await mongoose.connect(`mongodb://${mongoUserPass}${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`)
      console.log('📚 Connected to database mongodb')
      return true
    } catch (error) {
      console.log('❌ Fail to Connect to mongodb', error)
      process.exit()
    }
  }
}

export default MongoDbConnect
