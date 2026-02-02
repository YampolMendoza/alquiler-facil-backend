const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

// 🔥 IMPORTANTE PARA RENDER
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔍 TEST
app.get("/", (req, res) => {
  res.send("API Alquiler Fácil Perú funcionando 🚀");
});

// ❤️ HEALTH CHECK (OBLIGATORIO PARA RENDER)
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// 🏠 PUBLICAR ALQUILER
app.post("/alquileres", (req, res) => {
  const {
    tipo,
    distrito,
    direccion,
    piso,
    precio,
    condiciones,
    telefono
  } = req.body;

  if (!tipo || !distrito || !direccion || !precio || !telefono) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const fecha = new Date().toLocaleDateString("es-PE");

  const sql = `
    INSERT INTO alquileres
    (tipo, distrito, direccion, piso, precio, condiciones, telefono, fecha)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [tipo, distrito, direccion, piso, precio, condiciones, telefono, fecha],
    function (err) {
      if (err) {
        console.error("❌ DB Error:", err.message);
        return res.status(500).json({ error: "Error al guardar alquiler" });
      }

      res.status(201).json({
        mensaje: "Alquiler guardado",
        id: this.lastID
      });
    }
  );
});

// 📋 LISTAR ALQUILERES
app.get("/alquileres", (req, res) => {
  db.all("SELECT * FROM alquileres ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      console.error("❌ DB Error:", err.message);
      return res.status(500).json({ error: "Error al obtener alquileres" });
    }
    res.json(rows);
  });
});

// 🚀 INICIAR SERVIDOR (RENDER USA ESTE PUERTO)
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
