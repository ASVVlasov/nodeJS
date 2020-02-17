import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get('http://localhost:8080/tasks').pipe(
      map(
        (response) => {
          if ((response as any).message) {
            return [];
          }
          return (response as any).tasks as Task[];
        }
      )
    );
  }
  addTask(task: Task): Observable<Task> {
    return this.httpClient.post('http://localhost:8080/tasks', task).pipe(
      map(
        (response) => {
          if ((response as any).message) {
            return;
          }
          return response as Task;
        }
      )
    );
  }
  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put(`http://localhost:8080/tasks/${task._id}`, task).pipe(
      map(
        (response) => {
          if ((response as any).message) {
            return;
          }
          return response as Task;
        }
      )
    );
  }
  patchTask(task: any): Observable<Task> {
    return this.httpClient.patch(`http://localhost:8080/tasks/${task._id}`, task).pipe(
      map(
        (response) => {
          if ((response as any).message) {
            return;
          }
          return response as Task;
        }
      )
    );
  }
  deleteTask(taskId: string): Observable<Task> {
    return this.httpClient.delete(`http://localhost:8080/tasks/${taskId}`).pipe(
      map(
        (response) => {
          if ((response as any).message) {
            return;
          }
          return response as Task;
        }
      )
    );
  }
}
