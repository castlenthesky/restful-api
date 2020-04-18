// /src/loaders/index.ts
// This file configures and exports services for the app
// The methdology was taken from the following link:
// https://github.com/santiq/bulletproof-nodejs/blob/master/src/loaders/index.ts

import expressConfigurator from './express'

// export a function which awaits the successful configuration of express
export default async({ expressApp }) => {
  await expressConfigurator( { app: expressApp })
  console.log('Express loaded.')
}
