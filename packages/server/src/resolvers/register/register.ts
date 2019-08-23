import { User } from "@db/entity/User";
import { Resolvers } from "@generated/graphql";
import formatYupError from "@util/formatYupError";
import bcrypt from "bcryptjs";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email(),
  password: yup
    .string()
    .min(6)
    .max(255),
  username: yup
    .string()
    .min(5)
    .max(255)
});

const register: Resolvers = {
  Mutation: {
    register: async (_, args) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (e) {
        return formatYupError(e);
      }

      const { email, password, username } = args;
      const emailTaken = await User.findOne({
        where: { email },
        select: ["email"]
      });

      if (emailTaken) {
        return [{ path: "email", message: "email is already taken" }];
      }

      const usernameTaken = await User.findOne({
        where: { username },
        select: ["username"]
      });

      if (usernameTaken) {
        return [{ path: "username", message: "username is already taken" }];
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = User.create({ email, username, password: hashedPassword });

      await user.save();
      return null;
    }
  }
};

export default register;
