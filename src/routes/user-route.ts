import { Elysia, t } from "elysia";
import { usersService } from "../services/users-service";

/**
 * Helper untuk mengekstrak token Bearer dari header Authorization.
 * Melempar Error "Unauthorized" jika header tidak ada, format salah, atau token kosong.
 */
function extractBearerToken(headers: Record<string, string | undefined>): string {
  const authHeader = headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.substring(7);

  if (!token) {
    throw new Error("Unauthorized");
  }

  return token;
}

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
  )
  // POST /api/users/login - Login user
  .post(
    "/login",
    async ({ body, set }) => {
      try {
        const token = await usersService.login(body.email, body.password);
        return { data: token };
      } catch (error: any) {
        set.status = 400;
        return { error: error.message || "Login gagal" };
      }
    },
    {
      body: t.Object({
        email: t.String({ minLength: 1 }),
        password: t.String({ minLength: 1 }),
      }),
    }
  )
  // GET /api/users/current - Ambil data user yang sedang login
  .get(
    "/current",
    async ({ headers, set }) => {
      try {
        const token = extractBearerToken(headers);
        const user = await usersService.getCurrentUser(token);
        return { data: user };
      } catch (error: any) {
        set.status = 401;
        return { error: error.message || "Unauthorized" };
      }
    }
  )
  // DELETE /api/users/logout - Logout user dan hapus session
  .delete(
    "/logout",
    async ({ headers, set }) => {
      try {
        const token = extractBearerToken(headers);
        await usersService.logout(token);
        return { data: "OK" };
      } catch (error: any) {
        set.status = 401;
        return { error: error.message || "Unauthorized" };
      }
    }
  );


