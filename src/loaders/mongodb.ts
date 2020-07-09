import config from "../config";
import { MongoClient } from "mongodb";

export default class MongoLoader {
  // Define static variable to store the client
  public static client: MongoClient;

  // Define static variable to create the initial connection
  public static async connect() {
    MongoClient.connect(
      config.mongo.url,
      config.mongo.clientOptions,
      (err, client: MongoClient) => {
        if (err) {
          throw new Error(err);
        }
        MongoLoader.client = client;
      }
    );
  }
}

export function loadCollection(collectionName: string) {
  return MongoLoader.client.db(config.mongo.db).collection(collectionName);
}
