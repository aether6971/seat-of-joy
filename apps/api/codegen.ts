import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: ["src/**/*.graphql", "src/*.graphql"],
  generates: {
    "src/types/graphql.ts": {
      config: {
        contextType: "./contextType#Context",
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
