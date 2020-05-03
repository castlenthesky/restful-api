import { Request, Response, Next } from 'express'

export function allowedRoles (allowedRoles: string[]) {
  return (req: Request, res: Response, next: Next) => {
    if (allowedRoles.includes(req.token.role)) {
      return next()
    }
    return res.status(403).send({msg: 'Access Denied'})
  }
  // this moddleware checks a username and password against the database

}
