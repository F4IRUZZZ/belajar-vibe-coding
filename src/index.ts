import { Elysia } from "elysia";
import { itemsRoutes } from "./routes/items";
import { userRoutes } from "./routes/user-route";

const port = Number(process.env.PORT) || 3000;

const app = new Elysia()
  .get("/", () => ({
    name: "Belajar Vibe Coding API",
    version: "1.0.0",
    endpoints: {
      items: "/items",
      users: "/api/users",
    },
  }))
  .use(itemsRoutes)
  .use(userRoutes)
  .listen(port);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;
