require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorhandler");

require("./models/associations");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Cambiado ligeramente a true por buenas prácticas de parseo remoto

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use(errorHandler);

/* --- CÓDIGO ORIGINAL ---
sequelize.sync().then(() => {
  console.log("Tablas sincronizadas correctamente.");
});
*/

/* --- IMPLEMENTACIÓN PARA DEPLOY --- */
// EXPLICACIÓN: Cambiamos a `sequelize.sync({ alter: true })`. En producción (Supabase),
// la base de datos inicia vacía. Al usar 'alter: true', Sequelize creará automáticamente
// las tablas mapeadas en los modelos del alumno en el primer despliegue sin borrar los datos existentes.
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tablas sincronizadas en la Base de Datos correctamente.");
  })
  .catch((err) => {
    console.error("Error al sincronizar la Base de Datos:", err);
  });

// 2. CORRECCIÓN CRÍTICA PARA VERCEL:
// Solo ejecutamos app.listen localmente. En Vercel, NO debemos levantar el puerto manualmente.
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo localmente en el puerto ${PORT}`);
  });
}
