import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo-list.component.html',
  imports: [FormsModule,CommonModule] 
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  newTodoTitle: string = '';
  editingTodoId: string | null = null;
  editingTodoTitle: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(
      (data) => {
        this.todos = data;
      },
      (error) => {
        console.error('Error loading todos', error);
      }
    );
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) return;

    const newTodo = { title: this.newTodoTitle };
    this.todoService.createTodo(newTodo).subscribe(
      (todo) => {
        this.todos.push(todo);
        this.newTodoTitle = '';
      },
      (error) => {
        console.error('Error adding todo', error);
      }
    );
  }

  editTodo(todo: any): void {
    this.editingTodoId = todo._id;
    this.editingTodoTitle = todo.title;
  }

  updateTodo(): void {
    if (!this.editingTodoTitle.trim() || !this.editingTodoId) return;

    this.todoService.updateTodo(this.editingTodoId, { title: this.editingTodoTitle }).subscribe(
      (updatedTodo) => {
        const idx = this.todos.findIndex(todo => todo._id === this.editingTodoId);
        if (idx !== -1) {
          this.todos[idx] = updatedTodo;
        }
        this.editingTodoId = null;
        this.editingTodoTitle = '';
      },
      (error) => {
        console.error('Error updating todo', error);
      }
    );
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(
      () => {
        const idx = this.todos.findIndex((todo => todo._id === id))
        this.todos.splice(idx, 1);
      },
      (error) => {
        console.error('Error deleting todo', error);
      }
    );
  }
}
