import { Request, Response } from 'express'
import * as Model from './model'

export async function get (req: Request, res: Response) {
    return res.status(200).send(await Model.list(req.query))
}

export async function post (req: Request, res: Response) {
  try {
    let newDevice: {
      manufacturer: string,
      model: string,
      price: Number,
      display?: String,
      CPU?: String,
      RAM?: String,
      pros?: string[],
      cons?: string[],
    } = {
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      price: req.body.price,
      display: req.body.display,
      CPU: req.body.CPU,
      RAM: req.body.RAM,
      pros: req.body.pros,
      cons : req.body.cons,
    }
    return await Model.addDevice(newDevice).then(result => {
      if (result['msg']) {
        return res.status(400).send(result)
      }
      return res.status(201).send(result)
    })
  } catch (err) {
    return res.status(400).send({msg: err})
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
