import { Resolvers } from "../../types/graphql";

export const HelloResolvers: Resolvers = {
  Query: {
    hello: (_, { name }) => `Hey ${name || "World"}`,
  },
};
