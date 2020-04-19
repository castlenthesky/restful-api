import { Router } from 'express'

export default function router() {
  const router = Router()

  router.get('/', (req, res) => {
    return res.status(200).send('Welcome to the auth endpoint.')
  })

  return router
}
