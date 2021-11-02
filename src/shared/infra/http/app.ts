import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import swagger from 'swagger-ui-express'

import swaggerFile from './routes/swagger.json'

import { routes } from '@shared/infra/http/routes'
import '@shared/infra/typeorm'
import '@shared/container'

const app = express()

app.use(express.json())

app.use(routes)

app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile))

export { app }
