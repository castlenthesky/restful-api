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
  mongo: {
    url: process.env.MONGOURI,
    db: process.env.MONGODB,
    username: process.env.MONGOUSER,
    password: process.env.MONGOPASS,
  },
  jwt: {
    secret: process.env.SUPER_SECRET_TOKEN,
  }
}

export default config
