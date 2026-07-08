const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username y password son obligatorios" });
    }
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });
    res
      .status(201)
      .json({ message: `Usuario ${user.username} creado correctamente` });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
    );
    res.json({ token, username: user.username });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
