import { User } from "@db/entity/User";
import { Resolver } from "@type/Server";

const confirm: Resolver = {
  Mutation: {
    confirm: async (parent, args, context) => {
      const userID = await context.redis.get(args.id);

      if (!userID) {
        return false;
      }

      let user: User;

      try {
        user = await User.findOneOrFail(userID);
      } catch (e) {
        return false;
      }

      user.confirmed = true;

      await user.save();
      await context.redis.del(args.id);

      return true;
    }
  }
};

export default confirm;
