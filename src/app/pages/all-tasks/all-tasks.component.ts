import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/core/services/tasks/tasks.service';
import { IHeader } from 'src/app/shared/interfaces/IHeader';
import { ITask } from 'src/app/shared/interfaces/ITask';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.sass']
})
export class AllTasksComponent implements OnInit {

  header: IHeader ={
    title: "Todas as tarefas",
    hasButton: true
  }
  tasks!: ITask[];

  constructor(private tasksService: TasksService, private router: Router, private sharedService: SharedService){}

  ngOnInit(): void {
    this.getAllTasks()
  }

  getAllTasks() {
    this.tasksService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks.sort((a, b) => {
          // Primeiro, se ambos têm o mesmo valor de isActive, ordene por limitDate de forma decrescente
          if (a.isActive === b.isActive) {
            return new Date(a.limitDate).getTime() - new Date(b.limitDate).getTime();
          }
          // Se isActive é diferente, coloque os ativos (isActive = true) primeiro
          return a.isActive ? 1 : -1;
        });
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }

  receiveUptadedTask(event:ITask){
    this.tasksService.updateTask(event).subscribe({
      next: update => {
        this.getAllTasks()
      }
    })
  }

  editTask(event:string){
    // this.sharedService.emitTaskId(event);
    // this.router.navigate(["/home/edit-task"])
    console.log(this.tasks)
  }

  deleteTask(event:string){
    this.tasksService.deleteTask(event).subscribe()
    this.getAllTasks()
  }

}
