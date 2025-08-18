export enum UserRolesEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum UserLoginType {
  GOOGLE = "GOOGLE",
  GITHUB = "GITHUB",
  EMAIL_PASSWORD = "EMAIL_PASSWORD",
}

export const AvailableUserRoles = Object.values(UserRolesEnum);
export const AvailableSocialLogins = Object.values(UserLoginType);
export const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000; // 20 minutes
