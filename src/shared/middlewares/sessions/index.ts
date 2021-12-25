import AppError from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function sessionMiddleware (request:Request, response:Response, next:NextFunction): void {
  const tokenHeader = request.headers.authorization

  if (!tokenHeader) throw new AppError('JWT token is missing')

  const [, token] = tokenHeader.split(' ')

  try {
    const decoded = verify(token, process.env.JWT_TOKEN)

    const { sub } = decoded as TokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT Token')
  }
}
