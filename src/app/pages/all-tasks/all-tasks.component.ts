import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/core/services/tasks/tasks.service';
import { ITask } from 'src/app/shared/interfaces/ITask';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.sass']
})
export class AllTasksComponent implements OnInit {

  tasks!: ITask[];

  constructor(private tasksService: TasksService){}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe({
      next: (tasks) =>{
        this.tasks = tasks
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    })

  }

}
