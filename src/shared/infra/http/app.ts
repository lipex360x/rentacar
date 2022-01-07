import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { errors } from 'celebrate'

import routes from '@shared/infra/http/routes'
import routerError from '@shared/errors/RouterError'

import typeorm from '@shared/infra/typeorm'
import mongodb from '@shared/infra/mongoose'
import '@shared/containers'
import '@shared/providers'
import rateLimiter from '@shared/middlewares/rateLimiter'

const app = express()

app.use(cors())
app.use(rateLimiter)
app.use(express.json())

app.use(routes)

app.use(errors())
app.use(routerError)

export { app, typeorm, mongodb }
