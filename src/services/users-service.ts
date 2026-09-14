import { eq } from "drizzle-orm";
import { db } from "../db";
import { users, sessions } from "../db/schema";

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

  /**
   * Login user dan membuat session baru.
   * Melempar Error jika email atau password salah.
   */
  async login(email: string, password: string): Promise<string> {
    // 1. Cari user berdasarkan email
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (result.length === 0) {
      throw new Error("email atau password salah");
    }

    const user = result[0];

    // 2. Verifikasi password dengan Bun built-in bcrypt
    const isPasswordValid = await Bun.password.verify(password, user.password);

    if (!isPasswordValid) {
      throw new Error("email atau password salah");
    }

    // 3. Generate UUID token menggunakan Bun built-in
    const token = Bun.randomUUIDv7();

    // 4. Simpan session baru ke database
    await db.insert(sessions).values({
      token,
      userId: user.id,
    });

    // 5. Kembalikan token
    return token;
  },

  /**
   * Mendapatkan data user yang sedang login berdasarkan session token.
   * Melempar Error jika session atau user tidak ditemukan.
   */
  async getCurrentUser(token: string): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
  }> {
    // 1. Cari session berdasarkan token
    const sessionResult = await db
      .select()
      .from(sessions)
      .where(eq(sessions.token, token));

    if (sessionResult.length === 0) {
      throw new Error("Unauthorized");
    }

    const session = sessionResult[0];

    // 2. Cari user berdasarkan userId dari session
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId!));

    if (userResult.length === 0) {
      throw new Error("Unauthorized");
    }

    const user = userResult[0];

    // 3. Kembalikan data user (tanpa password)
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  },
};

