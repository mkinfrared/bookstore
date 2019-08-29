import { Resolver } from "@type/Server";

const logout: Resolver = {
  Mutation: {
    logout: async (parent, args, context) => {
      context.request.session!.destroy(err => console.error(err));
      return true;
    }
  }
};

export default logout;
