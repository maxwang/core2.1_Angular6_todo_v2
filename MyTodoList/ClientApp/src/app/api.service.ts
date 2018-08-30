import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Todo } from './todo';

const APIURL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(APIURL + '/api/todo/')
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  public createTodo(todo: Todo): Observable<Todo> {
    console.log('createTodo', todo);
    return this.http.post<Todo>(APIURL + '/api/todo', todo, httpOptions);
      // .pipe(
        //tap((todo: Todo) => console.log(todo)),
      //    catchError(this.handleError<Todo>('createTodo'))
      // );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
