const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🔍 TEST
app.get("/", (req, res) => {
    
    res.send("API Alquiler Fácil Perú funcionando 🚀");
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

    const fecha = new Date().toLocaleDateString();

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
                return res.status(500).json({ error: err.message });
            }
            res.json({ mensaje: "Alquiler guardado", id: this.lastID });
        }
    );
});

// 📋 LISTAR ALQUILERES
app.get("/alquileres", (req, res) => {
    db.all("SELECT * FROM alquileres ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
