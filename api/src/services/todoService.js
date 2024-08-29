const Todo = require('../models/todo');

class TodoService {
  async createTodo(title) {
    const newTodo = new Todo({ title });
    return await newTodo.save();
  }

  async getTodos() {
    return await Todo.find();
  }

  async getTodoById(id) {
    return await Todo.findById(id);
  }

  async updateTodoById(id, updates) {
    return await Todo.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteTodoById(id) {
    return await Todo.findByIdAndDelete(id);
  }
}

module.exports = new TodoService();
