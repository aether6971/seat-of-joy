import postgres from "postgres";
import { __prod__, __test__ } from "../constants";

interface ConfigMap {
  [key: string]: postgres.Options<{}>;
}

const config: ConfigMap = {
  test: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST_NAME,
  },
  development: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

export const database_config = (): postgres.Options<{}> => {
  return config[process.env.NODE_ENV || "development"];
};
