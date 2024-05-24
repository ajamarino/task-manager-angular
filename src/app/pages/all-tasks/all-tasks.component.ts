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

  getAllTasks(){
    this.tasksService.getTasks().subscribe({
      next: (tasks) =>{
        this.tasks = tasks
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    })
  }

  receiveUptadedTask(event:ITask){
    this.tasksService.updateTask(event).subscribe()
    this.getAllTasks()
  }

  editTask(event:string){
    this.sharedService.emitTaskId(event);
    this.router.navigate(["/home/edit-task"])
  }

  deleteTask(event:string){
    this.tasksService.deleteTask(event).subscribe()
    this.getAllTasks()
  }

}
