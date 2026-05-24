import express from "express";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";
import { createServer as createViteServer } from "vite";
import { config } from "./config";
import { initDatabase } from "./db/client";
import { createCheckinSpotRouter } from "./routes/checkinSpots";
import { registerLegacyGalleryRoutes } from "./routes/galleryLegacy";
import { ensureSeedCheckinSpots } from "./services/checkinSpotService";
import { ensureDefaultGalleryMedia, migrateLegacyGalleryJson } from "./services/galleryService";
import { getTides, isTideCity } from "./services/tideService";
import { getWeather, isWeatherCity } from "./services/weatherService";

const app = express();

fs.mkdirSync(config.uploadDir, { recursive: true });
initDatabase();
ensureSeedCheckinSpots();
migrateLegacyGalleryJson();
ensureDefaultGalleryMedia();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser(config.sessionSecret));

app.use(
  "/uploads",
  express.static(config.uploadDir, {
    setHeaders(res) {
      res.setHeader("X-Content-Type-Options", "nosniff");
    },
  })
);

app.use("/api/checkin-spots", createCheckinSpotRouter());

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!isWeatherCity(city)) {
    return res.status(400).json({ error: "Unsupported city. Use krabi or lanta." });
  }

  try {
    const data = await getWeather(city, { refresh: req.query.refresh === "1" });
    return res.json(data);
  } catch (error) {
    console.error("[weather] Unhandled API error:", error);
    return res.status(500).json({ error: "Failed to load weather data" });
  }
});

app.get("/api/tides", async (req, res) => {
  const city = req.query.city;
  if (!isTideCity(city)) {
    return res.status(400).json({ error: "Unsupported city. Use krabi or lanta." });
  }

  try {
    const data = await getTides(city, { refresh: req.query.refresh === "1" });
    return res.json(data);
  } catch (error) {
    console.error("[tides] Unhandled API error:", error);
    return res.status(500).json({ error: "Failed to load tide data" });
  }
});

registerLegacyGalleryRoutes(app, config.uploadDir);

async function startServer() {
  if (config.nodeEnv !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(config.rootDir, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(config.port, "0.0.0.0", () => {
    console.log(`[FULL-STACK PORT ALIGNED] Server listening on http://0.0.0.0:${config.port}`);
  });
}

startServer();
