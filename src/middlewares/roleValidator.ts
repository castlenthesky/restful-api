import { Request, Response, Next } from "express";

function allowedRoles(allowedRoles: string[]) {
  // this middleware checks the roles allowed for a given path
  return (req: Request, res: Response, next: Next) => {
    // Allowed roles are checked against the user presenting
    // verified token the request
    if (allowedRoles.includes("all")) {
      return next();
    }
    if (
      allowedRoles.includes("self") &&
      req.params.username === req.token.username
    ) {
      return next();
    }
    if (allowedRoles.includes(req.token.role)) {
      return next();
    }

    // Users with invalid roles are denied access.
    return res.status(403).send({ msg: "Access Denied" });
  };
}

export { allowedRoles };
