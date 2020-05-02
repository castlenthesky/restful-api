import {Request, Response} from 'express'
import config from '../../config'
import * as jwt from 'jsonwebtoken'
import * as crypto from 'crypto'

export async function generateToken (req:Request, res:Response) {
  try {
    let refreshID = req.body.userID + config.jwt.secret
    let salt = crypto.randomBytes(16).toString('base64')
    let hash = crypto.createHmac('sha512', salt).update(refreshID).digest('base64')
    req.body.refreshKey = salt;
    console.log('generating token...')
    jwt.sign(req.body, config.jwt.secret, (err, token) => {
      if (err) {
        console.log(err)
        return res.status(500).send({ errors: err })
      }
      let b = new Buffer(hash)
      let refresh_token = b.toString('base64')
      return res.status(201).send({ accessToken: token, refreshToken: refresh_token})
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({errors: err})
  }
}
