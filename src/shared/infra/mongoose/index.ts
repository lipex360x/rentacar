import mongoose from 'mongoose'

import mongoConfig from '@shared/config/mongo'

const mongoUserPass = mongoConfig.username
  ? `${mongoConfig.username}:${mongoConfig.password}@`
  : ''

mongoose.connect(`mongodb://${mongoUserPass}${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`).then(() => {
  console.log('📚 Connected to database mongodb')
}).catch((err) => {
  console.log(err)
})
