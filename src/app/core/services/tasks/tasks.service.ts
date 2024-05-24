import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
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

  getTaskById(id:string | null):Observable<ITask[]>{
    return this.http.get<ITask[]>(`${this.url}?id=${id}`)
  }

  createTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.url, task)
  }

  updateTask(task: ITask): Observable<ITask> {
    const url = `${this.url}/${task.id}`;
    return this.http.put<ITask>(url, task);
  }

  deleteTask(id: string): Observable<void> {
    console.log(id)
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }

  getLastId(): Observable<number> {
    return this.http.get<ITask[]>(this.url).pipe(
      map(tasks =>{
        let higherId: number = 0;
        for(let task of tasks){
          if(Number(task.id) >= higherId){
            higherId = Number(task.id)
          }
        }
        console.log(higherId)
        return higherId;
      }),
      catchError(() => of(-1))
    )
  }
}
