import express from "express";

type T = (
  req: express.Request & { user?: any },
  res: express.Response,
  next: express.NextFunction
) => void;

const asyncHandler = (requestHandler: T): T => {
  return (
    req: express.Request & { user?: any },
    res: express.Response,
    next: express.NextFunction
  ) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err: any) =>
      next(err)
    );
  };
};

export { asyncHandler };
