import { Router, Request, Response, Next } from "express";
import * as controller from "./controller";
import { hasValidToken, allowedRoles } from "../../middlewares";

const userRoutes = new Router();

userRoutes
  .route("/") // Handle routes for getting and posting records
  .get([
    hasValidToken,
    allowedRoles(["developer", "superuser"]),
    controller.get,
  ]);

userRoutes
  .route("/:username") // Handle routes for specific records
  .all([hasValidToken, controller.findByUsername])
  .get([allowedRoles(["all"]), controller.getByUsername])
  .put([
    allowedRoles(["developer", "admin", "superuser"]),
    controller.putByUsername,
  ])
  .patch([
    allowedRoles(["self", "admin", "developer", "superuser"]),
    controller.patchByUsername,
  ])
  .delete([allowedRoles(["self", "superuser"]), controller.deleteByUsername]);

// TODO: figure out how to read multiple params from the request and pass to multiple routers
// https://webapplog.com/url-parameters-and-routing-in-express-js/
// userRoutes
//   .route("/:username/todo") // Handle routes for specific records
//   .all([controller.findByUsername])
//   .use(todoRoutes);

// Defines a router to handle registration for new users
const registerRoute = new Router();
registerRoute
  .route("/") // Handle posts sent to register new users.
  .post([controller.post]);

// Defines a router to handle endpoints related to specific users
const profileRoute = new Router();
profileRoute
  .route("/:username") // Handle posts sent to register new users.
  .get([controller.findByUsername, controller.getByUsername]);

profileRoute.param(
  "username",
  (req: Request, res: Response, next: Next, username: string) => {
    // query the user data and attach to the request
    // ...
    console.info(`Username parameter detected: ${username}`);
    return next();
  }
);

export { userRoutes, registerRoute, profileRoute };
