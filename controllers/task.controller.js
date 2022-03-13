// Model
const TaskModel = require("../models/Task");

module.exports = class TaskController {
  static async find(req, res) {
    try {
      let { _id } = req.user;

      let tasks = await TaskModel.find({ user: _id });

      return res.status(200).json(tasks);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  static async findOne(req, res) {
    try {
      let { _id } = req.user;
      let { id } = req.params;

      let task = await TaskModel.findOne({ user: _id, _id: id });

      return res.status(200).json(task);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  static async create(req, res) {
    try {
      let { name } = req.body;
      let { _id } = req.user;

      let createdTask = await TaskModel.create({ name, user: _id });

      return res.status(200).json(createdTask);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  static async edit(req, res) {
    try {
      let { id } = req.params;
      let {  name, state } = req.body;
      let { _id } = req.user;

      let editedTask = await TaskModel.findOneAndUpdate({ _id: id, user: _id }, { name, state });

      return res.status(200).json(editedTask);
    } catch(err) {
      return res.status(400).json({ message: err });
    }
  }

  static async delete(req, res) {
    try {
      let { id } = req.params;
      let { _id } = req.user;

      let deletedTask = await TaskModel.findOneAndDelete({ _id: id, user: _id });

      return res.status(200).json(deletedTask);
    } catch(err) {
      return res.status(400).json({ message: err });
    }
  }

  static async getStates(req, res) {
    let states = TaskModel.schema.path('state').enumValues;
    return res.status(200).json(states);
  }
};
