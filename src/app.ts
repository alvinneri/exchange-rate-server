import express, { Application, Request, Response, NextFunction } from "express";

import cors from "cors";
import router from "./routes";
import ApiError from "./utils/error/ApiError";

const app: Application = express();

app.use(cors());

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((req, res, next) => {
  const error = new ApiError(
    `Can't find ${req.originalUrl} on this server`,
    404
  );
  next(error);
});

app.use(
  (
    err: ApiError,
    req: Request,
    res: Response,
    // eslint-disable-next-line no-unused-vars
    next: NextFunction
  ) => {
    const error = {
      statusCode: err.statusCode || 500,
      success: err.success,
      message: err.message,
    };

    res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
      data: null,
    });
  }
);

export default app;
