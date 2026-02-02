const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// 🔥 CREAR TABLA AUTOMÁTICAMENTE
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS alquileres (
        id SERIAL PRIMARY KEY,
        tipo TEXT,
        distrito TEXT,
        direccion TEXT,
        piso TEXT,
        precio INTEGER,
        condiciones TEXT,
        telefono TEXT,
        fecha TEXT
      );
    `);
    console.log("✅ Tabla alquileres lista");
  } catch (err) {
    console.error("❌ Error creando tabla:", err.message);
  }
})();

module.exports = pool;
