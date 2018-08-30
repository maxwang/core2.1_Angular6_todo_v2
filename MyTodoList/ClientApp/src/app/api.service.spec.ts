import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { Todo } from './todo';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  it('getAllTodos should return empty', inject([ApiService], (service: ApiService) => {
    service.getAllTodos().subscribe(
      todos => expect([]),
      err => console.log(err)
    );
  }));

  it('createTodos should create one todo', inject([ApiService], (service: ApiService) => {
    let todo = new Todo({
      id: 1,
      title: 'This is test 1',
      complete: false
    });

    service.createTodo(todo).subscribe(
      data => {
        expect(data.id).toBe(1);
      },
      err => console.log(err)
    );

    service.getAllTodos().subscribe(
      todos => expect(todos.length).toBe(1),
      err => console.log(err)
    );
}));

});
