import { Router } from "express";
import rates from './routes/rates';


const router = Router();

router.use(
  "/api/v1/rates",
  rates,
);


export default router;
