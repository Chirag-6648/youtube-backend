import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { API_PREFIX, API_VERSION } from "./constants.js";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser({}));

// Import routes

import UserRouter from "./Routes/user.routes.js";

// Routes Declaration

app.use(`/${API_PREFIX}/${API_VERSION}/user`, UserRouter);

export { app };
