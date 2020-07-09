import { Router } from "express";
import * as controller from "./controller";
import { hasValidToken, allowedRoles } from "../../middlewares";

const router = new Router();

router.use([hasValidToken, allowedRoles(["self", "user", "superuser"])]);

router
  .route("/random") // Handle routes to provide a random record
  .get([controller.getRandom]);

router
  .route("/") // Handle routes for getting and posting records
  .get([controller.get])
  .post([controller.post]);

router
  .route("/:id") // Handle routes for specific records
  .all([controller.findByID])
  .get([controller.getByID])
  .put([controller.putByID])
  .patch([controller.patchByID])
  .delete([controller.deleteByID]);

export default router;
