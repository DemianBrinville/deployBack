const errorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Token inválido o no proporcionado" });
  }
  console.error(`[ERROR] ${err.message}`);
  res.status(500).json({ error: err.message });
};

module.exports = errorHandler;
