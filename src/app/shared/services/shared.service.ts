import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private taskIdSource = new Subject<string>();
  taskId$ = this.taskIdSource.asObservable();

  emitTaskId(taskId: string) {
    this.taskIdSource.next(taskId);
  }
}
