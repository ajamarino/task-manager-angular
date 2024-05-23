import { Component, Input } from '@angular/core';
import { ITask } from '../../interfaces/ITask';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.sass']
})
export class TaskCardComponent {

  @Input() task!:ITask;

}
