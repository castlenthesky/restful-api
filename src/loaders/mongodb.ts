import { MongoClient, Db } from 'mongodb'
import config from '../config';


export default async (): Promise<Db> => {
  console.log(`Connecting to server...`);
  const client = new MongoClient(config.mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  if (!client.isConnected()) {
    await client.connect()
  }
  return client.db(config.mongoDB)
}
