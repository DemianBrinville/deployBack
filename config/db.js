const { Sequelize } = require("sequelize");

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
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Requisito crítico para conexiones TLS/SSL en entornos Serverless
        },
      },
      logging: false,
    })
  : new Sequelize("tasks_db", "root", "root", {
      host: "127.0.0.1",
      port: 3306,
      dialect: "mysql",
      logging: false,
    });

module.exports = sequelize;
