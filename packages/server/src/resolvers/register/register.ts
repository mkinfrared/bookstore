import { User } from "@db/entity/User";
import registrationEmail from "@emails/registrationEmail";
import { Resolvers } from "@generated/Graphql";
import createConfirmationLink from "@util/createConfirmationLink";
import formatYupError from "@util/formatYupError";
import { NODE_ENV } from "@util/secrets";
import sendEmail from "@util/sendEmail";
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
    register: async (parent, args, context) => {
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
      const link = await createConfirmationLink(
        user.id,
        context.redis,
        context.request
      );

      if (NODE_ENV !== "test") {
        await sendEmail(
          email,
          "Registration",
          "Confirm your registration",
          registrationEmail(link)
        );
      }

      return null;
    }
  }
};

export default register;
