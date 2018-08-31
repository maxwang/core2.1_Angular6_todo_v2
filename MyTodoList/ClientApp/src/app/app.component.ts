import { Component } from '@angular/core';
import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ClientApp';
  newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataService) {}

  onAddTodo(todo: Todo) {
    this.todoDataService.addTodo(todo);
  }
  
  
  get todos() {
    console.log('get todos()');
    return this.todoDataService.getAllTodos();
  }
}
