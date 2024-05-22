import { redisSessionPrefix } from "../../constants";
import { Resolvers } from "../../types/graphql";
import { removeAllSessions } from "../../utils/removeAllSessions";

export const LogoutAllResolvers: Resolvers = {
  Mutation: {
    logoutAll: async (_, __, { session, redis }) => {
      const { userId } = session;
      if (userId) {
        removeAllSessions(userId, redis);
        return { response: { success: true, errors: [] } };
      }
      return { response: { success: false, errors: [] } };
    },
  },
};
