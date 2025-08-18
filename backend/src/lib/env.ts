import dotenvx from "@dotenvx/dotenvx"
dotenvx.config()

export const MONGO_URI = process.env.MONGO_URI || "";
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "";
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "";
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
export const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000;

// Mail
export const MAILTRAP_SMTP_HOST = process.env.MAILTRAP_SMTP_HOST;
export const MAILTRAP_SMTP_PORT = process.env.MAILTRAP_SMTP_PORT;
export const MAILTRAP_SMTP_USER = process.env.MAILTRAP_SMTP_USER;
export const MAILTRAP_SMTP_PASS = process.env.MAILTRAP_SMTP_PASS;
