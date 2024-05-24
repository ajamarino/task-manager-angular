import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/core/services/tasks/tasks.service';
import { IHeader } from 'src/app/shared/interfaces/IHeader';
import { ITask } from 'src/app/shared/interfaces/ITask';

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

  constructor(private tasksService: TasksService){}

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
    this.tasksService.deleteTask(event).subscribe()
    this.getAllTasks()
  }

  deleteTask(event:string){
    this.tasksService.deleteTask(event).subscribe()
    this.getAllTasks()
  }

}
