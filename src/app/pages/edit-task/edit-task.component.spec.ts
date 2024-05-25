import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTaskComponent } from './edit-task.component';
import { TasksService } from 'src/app/core/services/tasks/tasks.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Label } from 'src/app/shared/enums/Label.enum';
import { Priority } from 'src/app/shared/enums/Priority.enum';
import { ITask } from 'src/app/shared/interfaces/ITask';
import { ChangeDetectorRef } from '@angular/core';
import { AppModule } from 'src/app/app.module';

class MockTasksService {
  getTaskById(id: string | null) {
    return of([
      { id: '1', description: 'Task 1', limitDate: '2024-12-31', priority: Priority.Baixo, label: Label.Casa, isActive: false }
    ]);
  }

  updateTask(task: ITask) {
    return of({});
  }
}

class MockSharedService {
  taskId$ = of('1');
}

class MockRouter {
  navigate(path: string[]) {}
}

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;
  let tasksService: TasksService;
  let sharedService: SharedService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskComponent ],
      providers: [
        { provide: TasksService, useClass: MockTasksService },
        { provide: SharedService, useClass: MockSharedService },
        ChangeDetectorRef
      ],
      imports: [AppModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(TasksService);
    sharedService = TestBed.inject(SharedService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize task details', () => {
    expect(component.descriptionInput.value).toBe('Task 1');
    expect(component.limitDate).toEqual(new Date('2024-12-31'));
    expect(component.priority).toBe(Priority.Baixo);
    expect(component.label).toBe(Label.Casa);
  });

  it('should update task', () => {
    spyOn(tasksService, 'updateTask').and.returnValue(of());
    spyOn(router, 'navigate');

    component.editTask();

    expect(tasksService.updateTask).toHaveBeenCalled();
  });

  it('should change input value', () => {
    component.onDescInputChange("teste")

    expect(component.description).toEqual("teste")
  })

});
