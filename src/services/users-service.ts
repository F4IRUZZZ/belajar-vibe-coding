import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export const usersService = {
  /**
   * Mendaftarkan user baru.
   * Melempar Error jika email sudah terdaftar.
   */
  async register(name: string, email: string, password: string): Promise<void> {
    // 1. Cek apakah email sudah terdaftar
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existing.length > 0) {
      throw new Error("email sudah terdaftar");
    }

    // 2. Hash password menggunakan Bun built-in bcrypt
    const hashedPassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    // 3. Simpan user baru ke database
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });
  },
};
