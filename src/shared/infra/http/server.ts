import { app, typeorm, mongodb } from './app'

class Server {
  async execute () {
    await typeorm.execute()
    await mongodb.execute()

    const api = app.listen(process.env.API_PORT, () => {
      console.log(`\nš API Started on port ${process.env.API_PORT} \nš Check Hello Message at ${process.env.API_URL}:${process.env.API_PORT}/hello`)
    })

    process.on('SIGINT', () => {
      console.log('\nā API Stopped')
      api.close()
    })
  }
}

export default new Server().execute()
