import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/shared/interfaces/ITask';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private url = 'http://localhost:3000/tasks'

  constructor(private http: HttpClient) { }

  getTasks(): Observable<ITask[]>{
    return this.http.get<ITask[]>(this.url);
  }
}
