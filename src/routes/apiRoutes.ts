import { Router } from 'express'
import usersRouter from '../services/users'
import devicesRouter from '../services/devices'

export default function router() {
  const router = Router()

  router.get('/', (req, res) => {
    res.status(200).send('Welcome to the API endpoint.')
  })

  router.use('/users', usersRouter())
  router.use('/devices', devicesRouter())

  return router
}
