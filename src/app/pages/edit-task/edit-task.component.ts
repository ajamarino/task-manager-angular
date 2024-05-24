import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { TasksService } from 'src/app/core/services/tasks/tasks.service';
import { Label } from 'src/app/shared/enums/Label.enum';
import { Priority } from 'src/app/shared/enums/Priority.enum';
import { IHeader } from 'src/app/shared/interfaces/IHeader';
import { IInput } from 'src/app/shared/interfaces/IInput';
import { ITask } from 'src/app/shared/interfaces/ITask';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.sass'],
})
export class EditTaskComponent {
  taskId!: string;

  header: IHeader = {
    title: 'Editar tarefa',
    hasButton: false,
  };
  descriptionInput: IInput = {
    label: 'Descrição',
    value: '',
    placeholder: '',
  };

  limitDate!: Date;

  description!: string;
  priority!: Priority;
  label!: Label;

  labels = [
    { value: Label.Casa, viewValue: 'Casa' },
    { value: Label.Escola, viewValue: 'Escola' },
    { value: Label.Trabalho, viewValue: 'Trabalho' },
    { value: Label.Hobbie, viewValue: 'Hobbie' },
  ];

  priorities = [
    { value: Priority.Baixo, viewValue: 'Baixa' },
    { value: Priority.Médio, viewValue: 'Média' },
    { value: Priority.Alto, viewValue: 'Alta' },
  ];

  constructor(
    private sharedService: SharedService,
    private tasksService: TasksService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.sharedService.taskId$.subscribe((taskId) => {
      this.taskId = taskId ? taskId : ""
      this.getTaskById(taskId);
    });
  }

  getTaskById(id: string | null) {
    console.log("hi")
    this.tasksService.getTaskById(id).subscribe({
      next: task =>{
        this.descriptionInput.value = task[0].description;
        this.limitDate = new Date(task[0].limitDate);
        this.priority = task[0].priority;
        this.label = task[0].label;
        this.cdr.detectChanges();
      },
      error: err => console.log("Erro ao buscar tarefa", err)
    });
  }

  onDescInputChange(desc: string) {
    this.description = desc;
  }

  editTask() {
    let taskPayload: ITask = {
      id: this.taskId,
      description: this.description,
      limitDate: this.limitDate ? this.limitDate.toDateString() : '',
      priority: this.priority,
      label: this.label,
      isActive: false,
    };

    return this.tasksService.updateTask(taskPayload).subscribe({
      next: res =>{
        this.router.navigate(["home/all-tasks"])
      },
      error: err => console.log(err)
    });
  }
}
