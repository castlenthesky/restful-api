// tokenValidation.ts

// This middleware function validates the user presenting the token against
// the user which the token was signed for.
// 

// https://github.com/makinhs/rest-api-tutorial/blob/master/common/middlewares/auth.validation.middleware.js

import config from '../../config'
import * as jwt from 'jsonwebtoken'

export default async function requireToken (req, res, next) {
  // Check for an authorization header
  if (!req.headers['authorization']) {
    return res.status(403).send('Access denied')
  }

  // check for the token bearer authorization method in the header
  let [prefix, payload] = req.headers['authorization'].split(' ')
  if (prefix !== 'Bearer') {
    return res.status(403).send('Access denied.')
  }

  jwt.verify(payload, config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(400).send(err)
    }
    console.log(decoded)
    return next()
  })
} 
