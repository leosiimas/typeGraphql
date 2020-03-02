import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("Aqui");
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      console.log("12312");
      return null;
    }

    if (!user.confirmed) {
      console.log("Aqu123123i");
      return null;
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}
