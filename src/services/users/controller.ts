import { Request, Response } from 'express'
import { createUser } from './userFunctions'

export let get = async (req: Request, res: Response) => {
  const user = await createUser(req.body)
  return res.status(200).send(user)
}

export let post = async (req: Request, res: Response) => {
  return res.status(201).send('Hello, thanks for posting.')
}

export let put = async (req: Request, res: Response) => {
  return res.status(200).send('Hello, thanks for putting.')
}

export let patch = async (req: Request, res: Response) => {
  return res.status(200).send('Hello, thanks for patching.')
}

export let remove = async (req: Request, res: Response) => {
  return res.status(200).send('Hello, thanks for deleting.')
}
