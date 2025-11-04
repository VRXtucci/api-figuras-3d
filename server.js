import express from "express";
import cors from "cors";
import path from "path";

// Importar los datos de las categorías
import { Animes } from "./data/animes.js";
import { Comics } from "./data/comics.js";
import { Juegos } from "./data/juegos.js";
import { Series } from "./data/series.js";

const app = express();
app.use(cors());
app.use(express.json());

// Servir imágenes desde la carpeta 'images'
app.use("/images", express.static(path.join(process.cwd(), "images")));

// Ruta para todas las figuras
app.get("/api/figures", (req, res) => {
  const host = req.protocol + "://" + req.get("host");

  // Función para agregar URL completa a las imágenes
  const addFullImgUrl = (arr) => {
    return arr.map((f) => ({
      ...f,
      imgs: f.imgs.map((img) => host + img),
    }));
  };

  const allFigures = [
    ...addFullImgUrl(animes),
    ...addFullImgUrl(Comics),
    ...addFullImgUrl(Juegos),
    ...addFullImgUrl(Series),
  ];

  res.json(allFigures);
});

// Ruta por categoría
app.get("/api/figures/:category", (req, res) => {
  const { category } = req.params;
  const host = req.protocol + "://" + req.get("host");

  let categoryData = [];

  switch (category.toLowerCase()) {
    case "animes":
      categoryData = Animes;
      break;
    case "comics":
      categoryData = Comics;
      break;
    case "juegos":
      categoryData = Juegos;
      break;
    case "series":
      categoryData = Series;
      break;
    default:
      return res.status(404).json({ message: "Categoría no encontrada" });
  }

  const result = categoryData.map((f) => ({
    ...f,
    imgs: f.imgs.map((img) => host + img),
  }));

  res.json(result);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
