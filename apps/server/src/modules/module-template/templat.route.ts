import { Router } from "express";

import * as controller from "./templat.controller.js";

const routes = Router();

routes.get("/", controller.list);
routes.get("/:id", controller.getById);
routes.post("/", controller.create);
routes.patch("/:id", controller.update);
routes.delete("/:id", controller.remove);

export default routes;
