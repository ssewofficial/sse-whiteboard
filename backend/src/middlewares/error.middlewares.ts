import mongoose from "mongoose";
import express from "express";

import logger from "../logger/winston.logger";
import { ApiError } from "../utils/ApiError";
// import { removeUnusedMulterImageFilesOnError } from "../utils/helpers.js";

type T = (
  err: Error | ApiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

const errorHandler: T = (err, req, res, next) => {
  let error = err;

  // Check if the error is an instance of an ApiError class which extends native Error class
  if (!(error instanceof ApiError)) {
    // if not
    // create a new ApiError instance to keep the consistency

    // assign an appropriate status code
    const statusCode =
      (error as any).statusCode || error instanceof mongoose.Error ? 400 : 500;

    // set a message from native Error instance or a custom one
    const message = error.message || "Something went wrong";
    error = new ApiError(
      statusCode,
      message,
      (error as any)?.errors || [],
      err.stack
    );
  }

  // Now we are sure that the `error` variable will be an instance of ApiError class
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // Error stack traces should be visible in development for debugging
  };

  logger.error(`${error.message}`);

  //   removeUnusedMulterImageFilesOnError(req);
  // Send error response
  return res.status((error as ApiError).statusCode).json(response);
};

export { errorHandler };
