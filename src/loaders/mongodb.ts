import config from '../config';
import { MongoClient, Db } from 'mongodb'

export default async (): Promise<Db> => {
  console.log(`Connecting to server...`);

  const database = new MongoClient(config.mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  if (!database.isConnected()) {
    await database.connect()
  }
  return database.db(config.mongoDB)
}
