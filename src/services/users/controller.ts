import { Request, Response } from 'express'
import * as userFunctions from './model'
import { createUser } from './userFunctions'

export async function findUser(username: string) {
  const [foundUser] = await userFunctions.findByUsername(username)
  return foundUser
}

export async function getOne (req: Request, res: Response) {
  delete req.user.password
  delete req.user._id
  delete req.user.__v
  return res.status(200).send(req.user)
}

export async function get (req: Request, res: Response) {
  userFunctions.list(req.body.query).then((userList) => {
    console.log(userList)
    const returnUsers = []
    userList.forEach(element => {
      const el = element.toJSON()
      delete el._id
      delete el.__id
      delete el.__v
      delete el.password
      returnUsers.push(el)
    });
    // console.log(returnUsers)
    return res.send(returnUsers);
  })
  // console.log(userList)
}

export async function post (req: Request, res: Response): Response {
  try {
    const newUser = await createUser({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      role: req.body.role,
      title: req.body.title,
    })
    await userFunctions.createUser(newUser).then((createdUser) => {
      // TODO: remove hashed password from POST response
      // The code below does not remove the hashed passwords before sending
      let responseObject = createdUser.toJSON()
      delete responseObject._id;
      delete responseObject.__v;
      delete responseObject.password;
      return res.status(201).send(responseObject)
    })
  } catch {
    return res.status(401).send('Users must have a unique username and email, and must provide a valid password.')
  }
}

export async function put (req: Request, res: Response) {
  return res.status(200).send('Hello, thanks for putting.')
}

export async function patch (req: Request, res: Response) {
  return res.status(200).send('Hello, thanks for patching.')
}

export async function remove (req: Request, res: Response) {
  return res.status(200).send('Hello, thanks for deleting.')
}
