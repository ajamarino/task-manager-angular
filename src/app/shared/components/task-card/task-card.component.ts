import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../../interfaces/ITask';
import { Priority } from '../../enums/Priority.enum';
import { Label } from '../../enums/Label.enum';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.sass']
})
export class TaskCardComponent implements OnInit {

  @Input() task!:ITask;
  @Output() editTask: EventEmitter<ITask> = new EventEmitter<ITask>();
  @Output() editEmmiter: EventEmitter<string> = new EventEmitter<string>();
  @Output() deletionEmitter: EventEmitter<string> = new EventEmitter<string>();


  priority:string = ""
  label:string = ""

  ngOnInit(): void {
    this.priority = this.transformToPriority(this.task.priority);
    this.label = this.transformToLabel(this.task.label)
  }

  sendTask(){
    this.editTask.emit(this.task)
  }

  emitEdit(){
    this.editEmmiter.emit(this.task.id)
  }

  emitDeletion(){
    this.deletionEmitter.emit(this.task.id)
  }

  transformToPriority(number: number):string{
    return Priority[number]
  }
  transformToLabel(number: number):string{
    return Label[number]
  }



}
