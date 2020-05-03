import {Request, Response, Next} from 'express'
import * as userModel from '../../services/users/model'
import { passwordValidator } from '../helpers/passwordTools'

export async function hasCredentials (req: Request, res: Response, next: Next) {
  // This middleware checks for a username and password within the body of a request
  // Business logic to ensure a valid set of credentials exists in the body of the post
  let errors = []
  if (!req.body.username) {
    errors.push('Request body must include the username field')
  }
  if (!req.body.password) {
    errors.push('Request body must include the password field')
  }
  if (errors.length) {
    // if any errors exist send them as a response 
    return res.status(400).send( {errors: errors.join(', ')})
  }
  
  // if no errors exist, the middleware passes the request forward
  return next()
}

export async function validCredentials (req: Request, res: Response, next: Next) {
  // this moddleware checks a username and password against the database
  const [foundUser] = await userModel.findByUsername(req.body.username)
  // check for the user in the database
  if (!foundUser) {
    return res.status(401).send({msg: 'Invalid username or password, try again.'})
  }
  // validate the password provided against the hashed password for the found user
  if  (!await passwordValidator(foundUser.password, req.body.password)) {
    return res.status(401).send({msg: 'Invalid username or password, try again.'})
  }

  req.user = foundUser.toJSON()
  delete req.user._id
  delete req.user.__v
  delete req.user.password
  return next()
}
