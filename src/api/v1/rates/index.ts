import { Router } from "express";
import getRates from "./rates";

const router = Router();

router.post(
  "/",
  getRates
);



export default router;
