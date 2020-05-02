import {Request, Response} from 'express'
import config from '../../config'
import * as jwt from 'jsonwebtoken'

export async function generateToken (req:Request, res:Response) {
  // TODO: Make refreish token cryptographically secure
  jwt.sign(req.user, config.jwt.secret, (err, token) => {
    if (err) {
      return res.status(500).send({errors: err})
    }
    return res.status(201).send({token: token})
  })
}
