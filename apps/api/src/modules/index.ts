import { HelloResolvers } from "./hello/resolvers";
import { LoginResolvers } from "./login/resolvers";
import { RegisterResolvers } from "./register/resolvers";
import { MeResolvers } from "./me/resolvers";
import { LogoutResolvers } from "./logout/resolvers";
import { LogoutAllResolvers } from "./logout all/resolvers";
import { ForgotResolvers } from "./fogot password/resolvers";

export const resolvers = Object.assign({
  Query: Object.assign({}, HelloResolvers.Query, MeResolvers.Query),
  Mutation: Object.assign(
    {},
    RegisterResolvers.Mutation,
    LoginResolvers.Mutation,
    LogoutResolvers.Mutation,
    LogoutAllResolvers.Mutation,
    ForgotResolvers.Mutation
  ),
});
