import { Router } from "express";
import * as controller from "./controller";

const authRoutes = new Router();

authRoutes
  .route("/") // Handle routes for getting and posting records
  .post([
    // locate, validate, and attach user to request
    controller.hasValidCredentials,
    controller.generateToken, // generate token
  ]);

export { authRoutes };
