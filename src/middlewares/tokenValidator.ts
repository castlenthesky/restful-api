// tokenValidation.ts

// This middleware function validates the user presenting the token against
// the user which the token was signed for.

// https://github.com/makinhs/rest-api-tutorial/blob/master/common/middlewares/auth.validation.middleware.js
import config from "../config";
import { Request, Response, Next } from "express";
import * as jwt from "jsonwebtoken";

async function hasValidToken(req: Request, res: Response, next: Next) {
  // Check for an authorization header
  if (!req.headers["authorization"]) {
    return res
      .status(403)
      .send({ msg: "Format for Authorization: Bearer [token]" });
  }

  // check for the token bearer authorization method in the header
  let [prefix, payload] = req.headers["authorization"].split(" ");
  if (prefix !== "Bearer") {
    return res
      .status(403)
      .send({ msg: "Format for Authorization: Bearer [token]" });
  }

  // Decode the token and embed with the response for further appliation use
  jwt.verify(payload, config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(400).send(err);
    }
    req.token = decoded;
    return next();
  });
}

export { hasValidToken };
