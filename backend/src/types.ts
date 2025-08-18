import { UserRolesEnum } from "./lib/constants";

export interface JWT_Profile {
  _id: string;
  email: string;
  username: string;
  role: UserRolesEnum;
}
