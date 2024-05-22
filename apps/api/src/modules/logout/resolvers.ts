import { Resolvers } from "../../types/graphql";

export const LogoutResolvers: Resolvers = {
  Mutation: {
    logout: async (_, __, { session }) => {
      const succesful = await new Promise<boolean>((resolve) =>
        session.destroy((err) => {
          if (err) {
            console.error(err);
            resolve(false);
          } else {
            resolve(true);
          }
        })
      );
      return {
        response: {
          success: succesful,
          errors: [],
        },
      };
    },
  },
};
