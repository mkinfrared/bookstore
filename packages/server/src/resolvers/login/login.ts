import { User } from "@db/entity/User";
import { emailNotVerified, invalidLogin } from "@messages/messages";
import { Error } from "@type/Graphql";
import { Resolver } from "@type/Server";
import bcrypt from "bcryptjs";

const login: Resolver = {
  Mutation: {
    login: async (parent, args, context) => {
      const { request } = context;
      const { username, password } = args;
      const user = await User.findOne({ where: { username } });
      const error: Error = {
        path: "username",
        message: invalidLogin
      };

      if (!user) {
        return [error];
      }

      if (!user.confirmed) {
        return [{ path: "username", message: emailNotVerified }];
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return [error];
      }

      if (request.session) {
        request.session.userID = user.id;
      }

      return null;
    }
  }
};

export default login;
