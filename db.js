const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../database/alquileres.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Error al conectar DB", err.message);
    } else {
        console.log("🗄️ Base de datos SQLite conectada");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS alquileres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT,
        distrito TEXT,
        direccion TEXT,
        piso TEXT,
        precio INTEGER,
        condiciones TEXT,
        telefono TEXT,
        fecha TEXT
    )
`);

module.exports = db;
