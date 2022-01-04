import UsersRepository from '@modules/accounts/infra/typeorm/repositories/Users.repository'
import AppError from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'

export default async function adminMiddleware (request:Request, response:Response, next:NextFunction): Promise<void> {
  const { id } = request.user

  try {
    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById({ id })

    if (!user.isAdmin) throw new Error()

    return next()
  } catch (error) {
    throw new AppError("This user isn't admin!")
  }
}
