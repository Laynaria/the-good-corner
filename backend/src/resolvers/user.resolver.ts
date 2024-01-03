import { Arg, Resolver, Mutation } from "type-graphql";
import { User } from "../entities/user";
import * as UserService from "../services/user.service";
import * as AuthService from "../services/auth.service"

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async signUp(@Arg("email") email: string, @Arg("password") password: string): Promise<User> {
    return await UserService.create(email, password);
  }

  @Mutation(() => String)
  async signIn(@Arg("email") email: string, @Arg("password") password: string)
  : Promise<String> 
  {
    try {
      return await AuthService.signIn(email, password);
    } catch (e) {
      throw new Error("Invalid User");
    }
  }
}
