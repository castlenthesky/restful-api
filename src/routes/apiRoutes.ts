import { Router } from 'express'
import usersRouter from '../services/users'

export default function router() {
  const router = Router()

  router.get('/', (req, res) => {
    res.status(200).send('Welcome to the API endpoint.')
  })

  router.use('/users', usersRouter())

  return router
}
