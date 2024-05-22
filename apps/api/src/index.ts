import "dotenv/config";
import { __prod__ } from "./constants";
import { createServer } from "./server";

(async () => {
  const { app } = await createServer();
  app.listen(4000, () => {
    console.log("Server running at http://localhost:4000/graphql 🚀");
  });
})();
