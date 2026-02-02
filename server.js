const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔍 TEST
app.get("/", (req, res) => {
  res.send("API Alquiler Fácil Perú funcionando 🚀");
});

// ❤️ HEALTH CHECK (Render)
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// 🏠 PUBLICAR ALQUILER
app.post("/alquileres", async (req, res) => {
  try {
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

    const query = `
      INSERT INTO alquileres
      (tipo, distrito, direccion, piso, precio, condiciones, telefono, fecha)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id
    `;

    const values = [
      tipo,
      distrito,
      direccion,
      piso,
      precio,
      condiciones,
      telefono,
      fecha
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      mensaje: "Alquiler guardado",
      id: result.rows[0].id
    });

  } catch (error) {
    console.error("❌ DB Error:", error);
    res.status(500).json({ error: "Error al guardar alquiler" });
  }
});

// 📋 LISTAR ALQUILERES
app.get("/alquileres", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM alquileres ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("❌ DB Error:", error);
    res.status(500).json({ error: "Error al obtener alquileres" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
