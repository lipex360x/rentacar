import { Router } from 'express'

const routes = Router()

routes.get('/hello', (request, response) => {
  response.json({ message: 'Hello World' })
})

export { routes }
