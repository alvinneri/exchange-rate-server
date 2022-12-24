import { Router } from "express";
import rates from "./api/v1/rates";

const router = Router();

router.use(
  "/api/v1/rates",
  rates
);


export default router;
