import { Request, Response, Next } from "express";

import { loadCollection } from "../../loaders/mongodb";
import { createUser, IUserData } from "./userFunctions";
import { existsInCollection } from "../../helpers/queryHelpers";

const controllerCollection = "users";

// Middleware for locating a user with a given username and attaching to the request
export async function findByUsername(req: Request, res: Response, next: Next) {
  req.db = loadCollection(controllerCollection); //Reference collection
  const [record] = await req.db
    .find({ username: req.params.username })
    .toArray();
  if (!record) {
    return res.status(404).send({ error: "Document does not exist." }).end();
  }
  req.user = record;
  return next();
}

export async function get(req: Request, res: Response) {
  const collection = loadCollection(controllerCollection);
  const dbResults = await collection.find(req.query).toArray();
  const userList = [];
  dbResults.forEach((user) => {
    delete user.password;
    userList.push(user);
  });
  return res.send(userList).end(201);
}

export async function post(req: Request, res: Response) {
  let errors = [];
  // TODO: Handle posts with multiple users

  // Validate the body of the post
  if (!req.body.username) {
    errors.push("New users must have a username.");
  }
  if (!req.body.password) {
    errors.push("New users must have a password.");
  }
  if (!req.body.email) {
    errors.push("New users must have an email.");
  }

  // Check for an existing user with the posted username
  if (
    await existsInCollection(
      controllerCollection,
      "username",
      req.body.username
    )
  ) {
    errors.push("Username must be unique.");
  }
  // Check for an existing user with the posted email
  if (await existsInCollection(controllerCollection, "email", req.body.email)) {
    errors.push(
      "A user already exists with this email address. Try recovering the account."
    );
  }

  if (errors.length) {
    return res.status(402).json({ errors: errors }).send();
  }

  let userData: IUserData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role,
    title: req.body.title,
    avatarURL: req.body.avatarURL,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  // Use the posted data to creat a user object
  const newUser = await createUser(userData);

  // Insert the new user into the collection
  const collection = loadCollection(controllerCollection);
  collection.insertOne(newUser, (err, result) => {
    if (err) {
      return res.status(504).send({ error: err }).end();
    }
    // TODO: delete hashed passwords from the response
    return res.status(201).json(result.ops).end();
  });
}

export async function getByUsername(req: Request, res: Response) {
  delete req.user.password;
  return res.status(200).send(req.user).end();
}

export async function putByUsername(req: Request, res: Response) {
  // Controller code goes here...
  if (
    existsInCollection(controllerCollection, "username", req.params.username)
  ) {
    console.info("user found");
    // Handle update of existing user
    return res.send("found user - api endpoint under construction").end(200);
  } else {
    console.info("user not found");
    // TODO: hande unfound record and create a new record
    return res
      .send("user not found - api endpoint under construction")
      .end(200);
  }
}

export async function patchByUsername(req: Request, res: Response) {
  // Controller code goes here...
  console.info(req.user._id);
  return res
    .status(200)
    .json({ response: "this api endpoing has not been fully implemented" })
    .end();
}

export async function deleteByUsername(req: Request, res: Response) {
  const collection = loadCollection(controllerCollection); //Reference collection
  collection.deleteOne(
    { username: req.params.username },
    (err, queryResult) => {
      if (err) {
        return res.status(401).send({ error: err }).end();
      }
      delete req.user.password;
      const response = {
        record: req.user,
        actionTaken: "Delete",
        result: queryResult.result.ok,
      };
      return res.status(201).json(response).end();
    }
  );
}
