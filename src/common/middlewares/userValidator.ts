import {Request, Response, Next} from 'express'

export async function hasCredentials (req: Request, res: Response, next: Next) {
  console.log('Check for user credentials here')
  return next()
}

export async function validCredentials (req: Request, res: Response, next: Next) {
  console.log('Check user password here')
  return next()
}
