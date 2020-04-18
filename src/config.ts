import * as dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envConfig = dotenv.config();

if (!envConfig) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

let config = {
  appurl: process.env.APPURL,
  port: parseInt(process.env.PORT, 10),

  // MonngoDB connection string.
  mongoURI: process.env.MONGOURI,
  mongoDB: process.env.MONGODB,
  mongoUser: process.env.MONGOUSER,
  mongoPass: process.env.MONGOPASS,
}

export default config
