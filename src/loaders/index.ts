import expressLoader from './express'
import mongodbLoader from './mongodb'

export default async ({ expressApp }) => {
  const mongoConnection = await mongodbLoader();
  console.log('DB loaded and connected!')

  await expressLoader({ app: expressApp });
  console.log('Express Initialized...');
}
