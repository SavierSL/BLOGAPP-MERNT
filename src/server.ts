import http from "http";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import logging from "../src/config/logging";
import config from "../src/config/config";
import sample from "./routes/sample";
import { connectDB } from "./config/db";
import users from "../src/routes/users";
import { Res, Req, Nxt } from "../src/TS/types";

const NAMESPACE = "Server";
const router = express.Router();
const app = express();

//Connect to DataBase
connectDB();

//Logging the request

app.use((req: Req, res: Res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
  );
  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${req.statusCode}]`
    );
  });
  next();
});

//Parse the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rules of our API
app.use((req: Req, res: Res, next: Nxt) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Accesst-Control-Allow-Methos", "GET POST PATCH DELETE PUT");
    return res.status(200).json({});
  }
  next();
});

//Routes
app.use("/sample", sample.router);
app.use("/users", users.router);

//Error Handling
app.use((req: Req, res: Res, next: Nxt) => {
  const error = "not found";
  res.status(404).json({
    message: error,
  });
  next();
});

//Create the server
// const httpServer = http.createServer(() => router);
app.listen(config.server.port, () =>
  logging.info(NAMESPACE, `${config.server.hostname}:${config.server.port}`)
);
