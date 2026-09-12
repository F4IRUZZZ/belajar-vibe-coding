import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { items } from "../db/schema";

export const itemsRoutes = new Elysia({ prefix: "/items" })
  // GET /items - ambil semua data
  .get("/", async () => {
    try {
      const allItems = await db.select().from(items);
      return {
        success: true,
        data: allItems,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to fetch items",
      };
    }
  })
  // GET /items/:id - ambil satu item berdasarkan id
  .get("/:id", async ({ params: { id }, set }) => {
    try {
      const result = await db.select().from(items).where(eq(items.id, id));
      if (!result.length) {
        set.status = 404;
        return { success: false, message: "Item not found" };
      }
      return { success: true, data: result[0] };
    } catch (error: any) {
      set.status = 500;
      return { success: false, message: error.message || "Failed to fetch item" };
    }
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  // POST /items - tambah data baru
  .post("/", async ({ body, set }) => {
    try {
      const result = await db.insert(items).values({
        name: body.name,
        description: body.description ?? null,
      });
      set.status = 201;
      return {
        success: true,
        message: "Item created successfully",
        insertId: result[0].insertId,
      };
    } catch (error: any) {
      set.status = 500;
      return { success: false, message: error.message || "Failed to create item" };
    }
  }, {
    body: t.Object({
      name: t.String({ minLength: 1 }),
      description: t.Optional(t.String()),
    }),
  })
  // PUT /items/:id - update data
  .put("/:id", async ({ params: { id }, body, set }) => {
    try {
      const existing = await db.select().from(items).where(eq(items.id, id));
      if (!existing.length) {
        set.status = 404;
        return { success: false, message: "Item not found" };
      }

      await db.update(items)
        .set({
          ...(body.name !== undefined && { name: body.name }),
          ...(body.description !== undefined && { description: body.description }),
        })
        .where(eq(items.id, id));

      return {
        success: true,
        message: "Item updated successfully",
      };
    } catch (error: any) {
      set.status = 500;
      return { success: false, message: error.message || "Failed to update item" };
    }
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: t.Object({
      name: t.Optional(t.String({ minLength: 1 })),
      description: t.Optional(t.String()),
    }),
  })
  // DELETE /items/:id - hapus data
  .delete("/:id", async ({ params: { id }, set }) => {
    try {
      const existing = await db.select().from(items).where(eq(items.id, id));
      if (!existing.length) {
        set.status = 404;
        return { success: false, message: "Item not found" };
      }

      await db.delete(items).where(eq(items.id, id));
      return {
        success: true,
        message: "Item deleted successfully",
      };
    } catch (error: any) {
      set.status = 500;
      return { success: false, message: error.message || "Failed to delete item" };
    }
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
  });
