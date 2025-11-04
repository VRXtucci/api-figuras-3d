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
import { Comics } from "./data/Comics.js";
import { Juegos } from "./data/Juegos.js";
import { Series } from "./data/Series.js";


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

app.get("/api/Animes", (req, res) => res.json(addHostToImages(req, Animes)));
app.get("/api/Comics", (req, res) => res.json(addHostToImages(req, Comics)));
app.get("/api/Juegos", (req, res) => res.json(addHostToImages(req, Juegos)));
app.get("/api/Series", (req, res) => res.json(addHostToImages(req, Series)));

// --- Puerto dinámico ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
);
