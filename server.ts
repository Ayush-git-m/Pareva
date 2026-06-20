import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { db } from "./src/db/index.js";
import { collections, jewelries, heroBanners, settings } from "./src/db/schema.js";
import { eq, desc } from "drizzle-orm";
import { requireAuth, AuthRequest } from "./src/middleware/auth.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Wait, I need an auth layer before making edits, but getting data is public.
  
  app.get("/api/collections", async (req, res) => {
    try {
      const result = await db.select().from(collections).orderBy(desc(collections.createdAt));
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch collections" });
    }
  });

  app.get("/api/jewelries", async (req, res) => {
    try {
      const result = await db.select().from(jewelries).orderBy(desc(jewelries.createdAt));
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch jewelries" });
    }
  });

  app.get("/api/hero-banners", async (req, res) => {
    try {
      const result = await db.select().from(heroBanners).orderBy(heroBanners.order);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch banners" });
    }
  });

  app.get("/api/settings", async (req, res) => {
    try {
      const result = await db.select().from(settings);
      // convert array of {key, value} to object
      const config: any = {};
      result.forEach(r => { config[r.key] = r.value; });
      res.json(config);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  // Protected routes for admin
  app.post("/api/settings", requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      if (user?.email !== 'ayushclasses10@gmail.com' && user?.email !== 'shreeparevajewellers@gmail.com') {
         res.status(403).json({ error: "Forbidden" });
         return;
      }
      
      const { settings: newSettings } = req.body;
      for (const [k, v] of Object.entries(newSettings)) {
         await db.insert(settings)
           .values({ key: k, value: String(v) })
           .onConflictDoUpdate({
              target: settings.key,
              set: { value: String(v) }
           });
      }
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update settings" });
    }
  });

  app.post("/api/collections", requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      if (user?.email !== 'ayushclasses10@gmail.com' && user?.email !== 'shreeparevajewellers@gmail.com') {
         res.status(403).json({ error: "Forbidden" });
         return;
      }
      
      const { title, description, imageUrl, firebaseId, metal } = req.body;
      const result = await db.insert(collections).values({ title, description, imageUrl, firebaseId, metal }).returning();
      res.json(result[0]);
    } catch (error) {
      console.error("DB error:", error);
      res.status(500).json({ error: "Failed to insert category" });
    }
  });

  app.post("/api/jewelries", requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      if (user?.email !== 'ayushclasses10@gmail.com' && user?.email !== 'shreeparevajewellers@gmail.com') {
         res.status(403).json({ error: "Forbidden" });
         return;
      }

      const { title, description, collectionId, imageUrl, imageUrls, price, firebaseId, weight, carat, gender, metal } = req.body;
      const finalGender = gender === null ? 'none' : (gender || 'none');
      const result = await db.insert(jewelries).values({ title, description, collectionId, imageUrl, imageUrls, price, firebaseId, weight, carat, metal, gender: finalGender } as any).returning();
      res.json(result[0]);
    } catch (error) {
      console.error("DB error:", error);
      res.status(500).json({ error: "Failed to insert jewellery" });
    }
  });

  app.post("/api/hero-banners", requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      if (user?.email !== 'ayushclasses10@gmail.com' && user?.email !== 'shreeparevajewellers@gmail.com') {
         res.status(403).json({ error: "Forbidden" });
         return;
      }
      
      const { title, subtitle, buttonText, buttonLink, imageUrl, order, enabled, firebaseId } = req.body;
      const result = await db.insert(heroBanners).values({ title, subtitle, buttonText, buttonLink, imageUrl, order, enabled, firebaseId }).returning();
      res.json(result[0]);
    } catch (error) {
      console.error("DB error:", error);
      res.status(500).json({ error: "Failed to insert banner" });
    }
  });

  app.delete("/api/collections/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      if (user?.email !== 'ayushclasses10@gmail.com' && user?.email !== 'shreeparevajewellers@gmail.com') {
         res.status(403).json({ error: "Forbidden" });
         return;
      }
      
      const { id } = req.params;
      await db.delete(collections).where(eq(collections.id, parseInt(id)));
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete" });
    }
  });
  app.put("/api/collections/:id", requireAuth, async (req: AuthRequest, res) => {
  try {
    const user = req.user;
    if (user?.email !== 'ayushclasses10@gmail.com' && user?.email !== 'shreeparevajewellers@gmail.com') {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const { id } = req.params;
    const { title, description, imageUrl, metal } = req.body;
    const result = await db.update(collections)
      .set({ title, description, imageUrl, metal })
      .where(eq(collections.id, parseInt(id)))
      .returning();
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update collection" });
  }
});

  app.delete("/api/jewelries/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      if (user?.email !== 'ayushclasses10@gmail.com' && user?.email !== 'shreeparevajewellers@gmail.com') {
         res.status(403).json({ error: "Forbidden" });
         return;
      }

      const { id } = req.params;
      await db.delete(jewelries).where(eq(jewelries.id, parseInt(id)));
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete" });
    }
  });
  app.put("/api/jewelries/:id", requireAuth, async (req: AuthRequest, res) => {
  try {
    const user = req.user;
    if (user?.email !== 'ayushclasses10@gmail.com' && user?.email !== 'shreeparevajewellers@gmail.com') {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const { id } = req.params;
    const { title, description, collectionId, imageUrl, imageUrls, price, weight, carat, gender, metal } = req.body;
    const finalGender = gender === null ? 'none' : (gender || 'none');
    const result = await db.update(jewelries)
      .set({ title, description, collectionId, imageUrl, imageUrls, price, weight, carat, metal, gender: finalGender } as any)
      .where(eq(jewelries.id, parseInt(id)))
      .returning();
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update jewellery" });
  }
});
  app.delete("/api/hero-banners/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      if (user?.email !== 'ayushclasses10@gmail.com' && user?.email !== 'shreeparevajewellers@gmail.com') {
         res.status(403).json({ error: "Forbidden" });
         return;
      }

      const { id } = req.params;
      await db.delete(heroBanners).where(eq(heroBanners.id, parseInt(id)));
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete" });
    }
  });

  // Toggle banner status
  // Reorder banner
  
  app.post("/api/hero-banners/reorder", requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      if (user?.email !== 'ayushclasses10@gmail.com' && user?.email !== 'shreeparevajewellers@gmail.com') {
         res.status(403).json({ error: "Forbidden" });
         return;
      }
      
      const items: any[] = req.body.items;
      for (const item of items) {
          await db.update(heroBanners).set({ order: item.order }).where(eq(heroBanners.id, parseInt(item.id)));
      }
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to reorder" });
    }
  });

  app.post("/api/hero-banners/:id/toggle", requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      if (user?.email !== 'ayushclasses10@gmail.com' && user?.email !== 'shreeparevajewellers@gmail.com') {
         res.status(403).json({ error: "Forbidden" });
         return;
      }

      const { id } = req.params;
      const { enabled } = req.body;
      const result = await db.update(heroBanners).set({ enabled }).where(eq(heroBanners.id, parseInt(id))).returning();
      res.json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to toggle banner" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      setHeaders: (res, path) => {
        if (path.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|avif|woff2?|ttf|eot)$/)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
