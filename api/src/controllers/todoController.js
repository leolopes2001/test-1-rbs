const TodoService = require('../services/todoService');

const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = await TodoService.createTodo(title);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await TodoService.getTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoService.getTodoById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const todo = await TodoService.updateTodoById(id, updates);
    if (!todo) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoService.deleteTodoById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {getTodos, createTodo, getTodoById, updateTodo, deleteTodo}
