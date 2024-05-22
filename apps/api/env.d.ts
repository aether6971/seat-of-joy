declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_TEST_NAME: string;
      GMAIL_APP_PASSWORD: string;
    }
  }
}

export {}
