import config from '../config';
import { MongoClient, Db } from 'mongodb'

export default async (): Promise<Db> => {
  console.log(`Connecting to server...`);

  const db = new MongoClient(config.mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  if (!db.isConnected()) {
    await db.connect()
  }
  return db
}
