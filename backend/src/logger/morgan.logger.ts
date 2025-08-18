import morgan from "morgan";
import logger from "./winston.logger";

const stream = {
  write: (message: string) => logger.http(message.trim()),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  ":remote-addr :method :url :status - :response-time ms",
  { stream, skip }
);

export default morganMiddleware;
