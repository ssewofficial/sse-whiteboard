import mongoose from "mongoose";
import logger from "../logger/winston.logger";
import { MONGO_URI } from "./env";

export let dbInstance: typeof mongoose | undefined = undefined;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 20000,
    });
    
    dbInstance = connectionInstance;
    logger.info(
      `\n☘️ MongoDB Connected| Db host: ${connectionInstance.connection.host}\n`
    );
  } catch (error) {
    logger.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
