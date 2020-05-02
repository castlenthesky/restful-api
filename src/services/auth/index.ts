import { Router } from 'express'
import { hasCredentials, validCredentials } from '../../common/middlewares/userValidator'
import { generateToken } from './controller'

export default function router() {
  const router = Router()

  router.route('/')
    .post([
      hasCredentials,
      validCredentials,
      generateToken
    ])

  return router
}
