import { Router } from 'express'
import * as userController from './controller'
import { validToken } from '../../common/middlewares/tokenValidator'
import { allowedRoles } from '../../common/middlewares/roleValidator'

export default function router() {
  const router = Router()

  router.route('/')
    .get([
      validToken,
      allowedRoles(['admin']),
      userController.get
    ])
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
    
    router.use('/:username', validToken)
    router.route('/:username')
    .get([
      userController.getOne,
      ])
    .put([
      allowedRoles(['admin', 'self']),
      userController.put,
      ])
    .patch([
      allowedRoles(['admin', 'self']),
      userController.patch,
      ])
    .delete([
      allowedRoles(['admin']),
      userController.remove,
      ])

  return router
}
