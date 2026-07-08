const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Task extends Model {}

Task.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    dueDate: DataTypes.DATEONLY,
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "task" },
);

module.exports = Task;
