import { Request, Response, Next } from 'express'

export function allowedRoles (allowedRoles: string[]) {
  // this middleware checks the roles allowed for a given path
  return (req: Request, res: Response, next: Next) => {
    // Actions allowed by a user are handled here
    if (allowedRoles.includes('self') && req.params.username === req.token.username) {
      return next()
    }
    // Allowed roles are checked against the user presenting the request
    if (allowedRoles.includes(req.token.role)) {
      return next()
    }

    // Users with invalid roles are denied access.
    return res.status(403).send({msg: 'Access Denied'})
  }
}
