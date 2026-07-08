const { Sequelize } = require("sequelize");
const pg = require("pg");

/* --- CÓDIGO ORIGINAL ---
const sequelize = new Sequelize("tasks_db", "root", "root", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
  logging: false,
});
*/

/* --- IMPLEMENTACIÓN PARA DEPLOY --- */
// EXPLICACIÓN: Evaluamos si existe la variable "DATABASE_URL" (que solo estará en producción).
// Si existe, Sequelize se conecta a la base de datos PostgreSQL de Supabase aplicando SSL obligatorio.
// Si no existe, el código automáticamente usará la configuración local de MySQL (retrocompatibilidad).

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg, // <-- 2. Obliga a Sequelize a usar este módulo inyectado
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Requerido para Supabase en producción
    },
  },
});

module.exports = sequelize;
