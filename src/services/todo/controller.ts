import { Request, Response, Next } from "express";
import { ObjectId } from "mongodb";
import { Todo } from "./todoFunctions";

import { loadCollection } from "../../loaders/mongodb";

const controllerCollection = "todos";

export async function get(req: Request, res: Response) {
  const collection = loadCollection(controllerCollection);
  collection.find(req.query).toArray((err, items) => {
    if (err) {
      console.error("Caught erroer:", err);
      return res.status(500).end();
    }
    return res.status(200).json(items).end();
  });
}

export async function getRandom(req: Request, res: Response) {
  const collection = loadCollection(controllerCollection);
  const [entry] = await collection
    .aggregate([{ $sample: { size: 1 } }])
    .toArray();
  return res.status(200).json(entry).end();
}

export async function post(req: Request, res: Response) {
  const todoItem = new Todo({
    description: req.body.description,
    author: req.token.username,
  });
  const collection = loadCollection(controllerCollection);
  const document = await collection.insertOne(todoItem, (err, result) => {
    if (err) {
      return res.status(504).send({ error: err }).end();
    }
    return result;
  });
  return res.status(201).send(document).end();
}

export async function findByID(req: Request, res: Response, next: Next) {
  const collection = loadCollection(controllerCollection); //Reference collection
  const [record] = await collection.find({ _id: req.params.id }).toArray();
  if (!record) {
    return res.status(404).send({ error: "Document does not exist." }).end();
  }
  req.record = record;
  return next();
}

export async function getByID(req: Request, res: Response) {
  // Controller code goes here...
  return res.status(200).send(req.record).end();
}

export async function putByID(req: Request, res: Response) {
  // Controller code goes here...
  return res
    .status(200)
    .json({ response: "this api endpoing has not been fully implemented" })
    .end();
}

export async function patchByID(req: Request, res: Response) {
  // Controller code goes here...
  return res
    .status(200)
    .json({ response: "this api endpoing has not been fully implemented" })
    .end();
}

export async function deleteByID(req: Request, res: Response) {
  // Controller code goes here...
  const collection = loadCollection(controllerCollection); //Reference collection
  collection.deleteOne({ _id: req.params.id }, (err, queryResult) => {
    if (err) {
      return res.status(401).send({ error: err }).end();
    }
    const response = {
      record: req.record,
      actionTaken: "Delete",
      result: queryResult.result.ok,
    };
    return res.status(201).json(response).end();
  });
}
