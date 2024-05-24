import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private taskIdSource = new BehaviorSubject<string | null>(null);
  taskId$ = this.taskIdSource.asObservable();

  emitTaskId(taskId: string) {
    this.taskIdSource.next(taskId);
  }
}
