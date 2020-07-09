import expressLoader from './express';
import MongoLoader from './mongodb';

export default async () => {
  const mongoConnection = await MongoLoader.connect();
  console.log('DB loaded and connected!')

  const app = await expressLoader();
  console.log('Express Initialized...');
  
  return { app }
}

