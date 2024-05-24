import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { TasksService } from 'src/app/core/services/tasks/tasks.service';
import { Label } from 'src/app/shared/enums/Label.enum';
import { Priority } from 'src/app/shared/enums/Priority.enum';
import { IHeader } from 'src/app/shared/interfaces/IHeader';
import { IInput } from 'src/app/shared/interfaces/IInput';
import { ITask } from 'src/app/shared/interfaces/ITask';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.sass']
})
export class NewTaskComponent {

  header: IHeader ={
    title: "Nova tarefa",
    hasButton: false
  }
  descriptionInput:IInput = {
    label:"Descrição",
    value: "",
    placeholder: ""
  }

  limitDate!: Date;

  description:string = ""
  priority!: Priority;
  label!:Label;

  labels = [
    {value: Label.Casa, viewValue: 'Casa'},
    {value: Label.Escola, viewValue: 'Escola'},
    {value: Label.Trabalho, viewValue: 'Trabalho'},
    {value: Label.Hobbie, viewValue: 'Hobbie'},
  ];

  priorities = [
    {value: Priority.Baixo, viewValue: 'Baixa'},
    {value: Priority.Médio, viewValue: 'Média'},
    {value: Priority.Alto, viewValue: 'Alta'},
  ];

  constructor(private tasksService: TasksService, private router:Router){}

  onDescInputChange(desc: string){
    this.description = desc
  }

  createTask(){
    this.tasksService.getLastId().pipe(
      switchMap(lastId => {
        let id = lastId + 1
        let taskPayload: ITask = {
          id: id.toString(),
          description: this.description,
          limitDate: this.limitDate ? this.limitDate.toDateString() : "",
          priority: this.priority,
          label: this.label,
          isActive: true
        };
        return this.tasksService.createTask(taskPayload);
      })
    ).subscribe({
      next: task => {
        this.router.navigate(['/home/all-tasks'])
      },
      error: err => console.error('Error creating task', err)
    });
  }

}
