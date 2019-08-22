// import { ResolverMap } from "type/graphqlUtils.type";
import { IResolvers } from "graphql-tools";

export const resolvers: IResolvers = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || "World"}`
  },
  Mutation: {
    register: (
      _,
      { email, password, username }: GQL.IRegisterOnMutationArguments
    ) => true
  }
};
