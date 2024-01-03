import { User } from "../entities/user";
import * as argon2 from "argon2";

export async function create(email: string, password: string): Promise<User> {
  const user = new User();
  user.email = email;
  user.password = await argon2.hash(password);
  user.role = "USER";
  return user.save();
}

export async function getByEmail(email: string): Promise<User> {
  return User.findOneByOrFail({ email });
}
