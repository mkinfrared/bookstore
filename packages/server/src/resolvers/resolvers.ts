import { User } from "@db/entity/User";
import bcrypt from "bcryptjs";
import { IResolvers } from "graphql-tools";

export const resolvers: IResolvers = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || "World"}`
  },
  Mutation: {
    register: async (
      _,
      { email, password, username }: GQL.IRegisterOnMutationArguments
    ) => {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = User.create({ email, username, password: hashedPassword });

      try {
        await user.save();
        return true;
      } catch (e) {
        return false;
      }

      // return user;
    }
  }
};
