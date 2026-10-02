import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { templateRoutes } from "@/modules/index.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.status(200).json({ status: "ok" });
  });

  app.use("/api/templates", templateRoutes);

  return app;
}
