import { Elysia } from "elysia";
import { itemsRoutes } from "./routes/items";

const port = Number(process.env.PORT) || 3000;

const app = new Elysia()
  .get("/", () => ({
    name: "Belajar Vibe Coding API",
    version: "1.0.0",
    endpoints: {
      items: "/items",
    },
  }))
  .use(itemsRoutes)
  .listen(port);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;
