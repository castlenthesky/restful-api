import { Request, Response, Next } from "express";
import config from "../../config";
import * as jwt from "jsonwebtoken";
import { loadCollection } from "../../loaders/mongodb";
import { passwordCheck } from "../../helpers";

export async function hasValidCredentials(
  req: Request,
  res: Response,
  next: Next
) {
  let errors = [];
  if (!req.body.username || !req.body.password) {
    errors.push(
      `Post body must contain a key-value pair for both "username" and "password" in order to authenticate a user.`
    );
  }
  if (errors.length) {
    return res.status(401).json({ errors: errors }).end();
  }
  // locate record
  const collection = loadCollection("users"); //Reference collection
  const [foundUser] = await collection
    .find({ username: req.body.username })
    .toArray();
  if (!foundUser) {
    return res
      .status(404)
      .send({ error: "Invalid username or password" })
      .end();
  }
  if (!(await passwordCheck(foundUser.password, req.body.password))) {
    return res.status(401).send({ error: "Invalid username or password" });
  }
  req.user = foundUser;
  delete req.user.password;
  return next();
}

export async function generateToken(req: Request, res: Response) {
  // TODO: Make refreish token cryptographically secure
  jwt.sign(req.user, config.jwt.secret, (err, token) => {
    if (err) {
      return res.status(500).send({ errors: err });
    }
    return res.status(201).send({ token: token });
  });
}
