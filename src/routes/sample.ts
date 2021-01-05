import express from "express";
import controller from "../controllers/sampleCtrl";

const router = express();

router.get("/ping", controller.sampleController);

export default { router };
