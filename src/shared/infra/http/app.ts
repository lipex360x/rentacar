import express from 'express'
import 'dotenv/config'
import swagger from 'swagger-ui-express'

import { routes } from '@shared/infra/http/routes'
import swaggerFile from './routes/swagger.json'

const app = express()

app.use(express.json())

app.use(routes)

app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile))

export { app }
