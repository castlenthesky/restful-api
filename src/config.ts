const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envConfig = dotenv.config();

if (!envConfig) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  app: {
    url: process.env.APPURL || "localhost",
    port: process.env.PORT || 4000,
  },
  mongo: {
    url: process.env.MONGOURL,
    db: process.env.MONGODBNAME,
    clientOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10,
    },
  },
  jwt: {
    secret: process.env.SECRET_JWT_KEY,
  },
};
