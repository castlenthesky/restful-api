import { Router } from 'express'

export default function router() {
  const router = Router()

  router.get('/', (req, res) => {
    res.status(200).send('Welcome to the API endpoint.')
  })

  return router
}
