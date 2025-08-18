import fs from "fs";
import mongoose from "mongoose";
import logger from "../logger/winston.logger";
import { Request } from "express";

export const filterObjectKeys = (
  fieldsArray: string[],
  objectArray: any[]
): any[] => {
  const filteredArray = structuredClone(objectArray).map((originalObj) => {
    let obj: Record<string, any> = {};
    structuredClone(fieldsArray)?.forEach((field) => {
      if (field?.trim() in originalObj) {
        obj[field] = originalObj[field];
      }
    });
    if (Object.keys(obj).length > 0) return obj;
    return originalObj;
  });
  return filteredArray;
};

export const getPaginatedPayload = (
  dataArray: any[],
  page: number,
  limit: number
) => {
  const startPosition = +(page - 1) * limit;

  const totalItems = dataArray.length; // total documents present after applying search query
  const totalPages = Math.ceil(totalItems / limit);

  dataArray = structuredClone(dataArray).slice(
    startPosition,
    startPosition + limit
  );

  const payload = {
    page,
    limit,
    totalPages,
    previousPage: page > 1,
    nextPage: page < totalPages,
    totalItems,
    currentPageItems: dataArray?.length,
    data: dataArray,
  };
  return payload;
};

export const getStaticFilePath = (req: Request, fileName: string) => {
  return `${req.protocol}://${req.get("host")}/images/${fileName}`;
};

export const getLocalPath = (fileName: string) => {
  return `public/images/${fileName}`;
};

export const removeLocalFile = (localPath: string) => {
  fs.unlink(localPath, (err) => {
    if (err) logger.error("Error while removing local files: ", err);
    else {
      logger.info("Removed local: ", localPath);
    }
  });
};

export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};
