import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../interfaces/ITask';
import { Priority } from '../../enums/Priority.enum';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.sass']
})
export class TaskCardComponent implements OnInit {

  @Input() task!:ITask;

  priority:string = ""

  ngOnInit(): void {
    this.priority = this.transformToPriority(this.task.priority);
  }

  transformToPriority(number: number):string{
    return Priority[number]
  }

}
