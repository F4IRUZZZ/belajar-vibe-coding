import { Elysia, t } from "elysia";
import { usersService } from "../services/users-service";

export const userRoutes = new Elysia({ prefix: "/api/users" })
  // POST /api/users - Registrasi user baru
  .post(
    "/",
    async ({ body, set }) => {
      try {
        await usersService.register(body.name, body.email, body.password);
        return { data: "OK" };
      } catch (error: any) {
        set.status = 400;
        return { error: error.message || "Registrasi gagal" };
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1 }),
        email: t.String({ minLength: 1 }),
        password: t.String({ minLength: 1 }),
      }),
    }
  );
