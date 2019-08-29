import { User } from "@db/entity/User";
import { Resolver } from "@type/Server";

const currentUser: Resolver = {
  Query: {
    currentUser: async (parent, args, context) => {
      const { session } = context.request;

      if (session && session.userID) {
        const user = (await User.findOne(session.userID)) as User;

        return user;
      }

      return null;
    }
  }
};

export default currentUser;
