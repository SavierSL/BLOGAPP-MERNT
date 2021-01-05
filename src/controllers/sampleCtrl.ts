import { Response, Request, NextFunction } from "express";
import logging from "../config/logging";

const NAMESPACE = "Server sample";

const sampleController = (req: Request, res: Response) => {
  logging.info(NAMESPACE, "Sample server check");
  return res.status(200).json({
    message: "pong",
  });
};

export default { sampleController };
