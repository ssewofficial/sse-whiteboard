import express from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError";

export const validate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const extractedErrors: Record<string, string>[] = [];
  // @ts-expect-error
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
  throw new ApiError(422, "Received data is not valid", extractedErrors);
};
