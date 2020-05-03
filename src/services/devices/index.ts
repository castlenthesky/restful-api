import { Router } from 'express'
import * as serviceController from './controller'

export default function router() {
  const router = Router()

  router.route('/')
    .get([serviceController.get])
    .post([serviceController.post])
    .put([serviceController.put])
    .patch([serviceController.patch])
    .delete([serviceController.remove])

  return router
}
