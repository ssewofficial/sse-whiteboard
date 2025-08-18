import { body, param, ValidationChain } from "express-validator";

export const mongoIdPathVariableValidator = (
  idName: string
): ValidationChain[] => {
  return [
    param(idName).notEmpty().isMongoId().withMessage(`Invalid ${idName}`),
  ];
};

export const mongoIdRequestBodyValidator = (
  idName: string
): ValidationChain[] => {
  return [body(idName).notEmpty().isMongoId().withMessage(`Invalid ${idName}`)];
};
