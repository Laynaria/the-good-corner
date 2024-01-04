import { User } from "../entities/user";

export type CustomContextType = {
  user: User;
  token: string;
};
