import { User } from "@db/entity/User";
import bcrypt from "bcryptjs";
import { Resolvers } from "generated/graphql";

const register: Resolvers = {
  Mutation: {
    register: async (_, { email, password, username }) => {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = User.create({ email, username, password: hashedPassword });

      try {
        await user.save();
        return true;
      } catch (e) {
        return false;
      }
    }
  }
};

export default register;
