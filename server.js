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

// --- Importar las categorías ---
import animes from "./data/Animes.js";
import comics from "./data/Comics.js";
import juegos from "./data/Juegos.js";
import series from "./data/Series.js";

// --- Rutas principales ---
app.get("/", (req, res) => {
  res.send("🚀 API de Figuras 3D funcionando correctamente");
});

app.get("/api/animes", (req, res) => {
  const host = req.protocol + "://" + req.get("host");
  const data = animes.map((f) => ({
    ...f,
    imgs: f.imgs.map((img) => host + img),
  }));
  res.json(data);
});

app.get("/api/comics", (req, res) => {
  const host = req.protocol + "://" + req.get("host");
  const data = comics.map((f) => ({
    ...f,
    imgs: f.imgs.map((img) => host + img),
  }));
  res.json(data);
});

app.get("/api/juegos", (req, res) => {
  const host = req.protocol + "://" + req.get("host");
  const data = juegos.map((f) => ({
    ...f,
    imgs: f.imgs.map((img) => host + img),
  }));
  res.json(data);
});

app.get("/api/series", (req, res) => {
  const host = req.protocol + "://" + req.get("host");
  const data = series.map((f) => ({
    ...f,
    imgs: f.imgs.map((img) => host + img),
  }));
  res.json(data);
});

// --- Puerto dinámico (Railway/Render asignan uno automáticamente) ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
