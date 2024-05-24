import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.sass']
})
export class EditTaskComponent {
  taskId!: string;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.taskId$.subscribe(taskId => {
      this.taskId = taskId;
      console.log(taskId)
    });
  }
}
