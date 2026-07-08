const Task = require("../models/task");

const getAll = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.auth.id } });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.auth.id } });
    if (!task) {
      return res
        .status(404)
        .json({ error: `No se encontró la tarea con ID ${id}` });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    if (!title) {
      return res.status(400).json({ error: "El campo title es obligatorio" });
    }
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      userId: req.auth.id,
    });
    res
      .status(201)
      .json(`Has agregado la tarea ${newTask.title} correctamente`);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.auth.id } });
    if (!task) {
      return res
        .status(404)
        .json({ error: `No se encontró la tarea con ID ${id}` });
    }
    await task.destroy();
    res.json(`Has eliminado la tarea con el ID ${id} de la base de datos`);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.auth.id } });
    if (!task) {
      return res
        .status(404)
        .json({ error: `No se encontró la tarea con ID ${id}` });
    }
    await task.update(req.body);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, remove, update };
