import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// --- Configuración base ---
const app = express();
app.use(cors());
app.use(express.json());

// Necesario para obtener __dirname cuando se usa ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Servir imágenes ---
app.use("/images", express.static(path.join(__dirname, "images")));

// --- Importar los datos ---
import { Animes } from "./data/Animess.js";
import { Comics } from "./data/Comicss.js";
import { Juegos } from "./data/Juegoss.js";
import { Series } from "./data/Seriess.js";


// --- Rutas principales ---
app.get("/", (req, res) => {
  res.send("🚀 API de Figuras 3D funcionando correctamente");
});

function addHostToImages(req, items) {
  const host = `${req.protocol}://${req.get("host")}`;
  return items.map(f => ({
    ...f,
    imgs: f.imgs.map(img => host + img),
  }));
}

app.get("/api/Animess", (req, res) => res.json(addHostToImages(req, Animes)));
app.get("/api/Comicss", (req, res) => res.json(addHostToImages(req, Comics)));
app.get("/api/Juegoss", (req, res) => res.json(addHostToImages(req, Juegos)));
app.get("/api/Seriess", (req, res) => res.json(addHostToImages(req, Series)));

// --- Puerto dinámico ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
);
