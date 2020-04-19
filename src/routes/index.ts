import { Router } from 'express'
import apiRouter from './apiRoutes'
import authRouter from '../services/auth'

export default function router() {
  const router = Router()

  router.use('/api', apiRouter())
  router.use('/auth', authRouter())

  router.get('/', (req, res) => {
    return res.status(200).send('Welcome to the restful application.')
  })

  return router
}
