import { Router } from 'express'
import * as userController from './controller'

export default function router() {
  const router = Router()

  router.route('/')
    .get([userController.get])
    .post([userController.post])

    router.use('/:username', (req, res, next) => {
      userController.findUser(req.params.username).then((user) => {
        if (user) {
          req.user = user.toJSON();
          return next()
        }
        return res.status(404).send('No such user found.')
      })
    })

    router.route('/:username')
    .get([userController.getOne])
    .put([userController.put])
    .patch([userController.patch])
    .delete([userController.remove])

  return router
}
