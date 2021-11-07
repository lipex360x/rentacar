import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'

import { routes } from '@shared/infra/http/routes'
import '@shared/infra/typeorm'
import '@shared/container'
import routerError from '@shared/errors/RouterError'

const app = express()

app.use(express.json())

app.use(routes)
app.use(routerError)

export { app }
