import { GraphQLClient } from "graphql-request";

export const GQLClient = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  {
    credentials: "include",
    mode: "cors",
  }
);
