import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllTasksComponent } from './all-tasks.component';
import { TasksService } from 'src/app/core/services/tasks/tasks.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ITask } from 'src/app/shared/interfaces/ITask';
import { AppModule } from 'src/app/app.module';
import { RouterTestingModule } from '@angular/router/testing';

class MockTasksService {
  getTasks() {
    return of([
      {
        id: '1',
        description: 'Task 1',
        limitDate: '2024-12-31',
        priority: 1,
        label: 1,
        isActive: false,
      },
      {
        id: '2',
        description: 'Task 2',
        limitDate: '2024-12-30',
        priority: 2,
        label: 2,
        isActive: true,
      },
    ]);
  }

  updateTask(task: ITask) {
    return of(task);
  }

  deleteTask(taskId: string) {
    return of({});
  }
}

class MockRouter {
  navigate(path: string[]) {}
}

class MockSharedService {
  emitTaskId(taskId: string) {}
}

describe('AllTasksComponent', () => {
  let component: AllTasksComponent;
  let fixture: ComponentFixture<AllTasksComponent>;
  let tasksService: TasksService;
  let router: Router;
  let sharedService: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTasksComponent],
      providers: [
        { provide: TasksService, useClass: MockTasksService },
        { provide: SharedService, useClass: MockSharedService },
      ],
      imports: [AppModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTasksComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(TasksService);
    router = TestBed.inject(Router);
    sharedService = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct header value', () => {
    expect(component.header).toEqual({
      title: 'Todas as tarefas',
      hasButton: true,
    });
  });

  it('should fetch and sort tasks on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.tasks.length).toBe(2);
    expect(component.tasks[0].description).toBe('Task 1');
    expect(component.tasks[1].description).toBe('Task 2');
  });

  it('should log an error when task fetch fails', () => {
    spyOn(tasksService, 'getTasks').and.returnValue(throwError('Error'));
    spyOn(console, 'error');

    component.getAllTasks();

    expect(console.error).toHaveBeenCalledWith(
      'Error fetching tasks:',
      'Error'
    );
  });

  it('should update and refresh tasks', () => {
    spyOn(component, 'getAllTasks');
    const updatedTask: ITask = {
      id: '1',
      description: 'Updated Task 1',
      limitDate: '2024-12-31',
      priority: 1,
      label: 1,
      isActive: false,
    };

    component.receiveUptadedTask(updatedTask);

    expect(component.getAllTasks).toHaveBeenCalled();
  });

  it('should navigate to edit task page', () => {
    spyOn(router, 'navigate');
    spyOn(sharedService, 'emitTaskId');
    const taskId = '1';

    component.editTask(taskId);

    expect(sharedService.emitTaskId).toHaveBeenCalledWith(taskId);
    expect(router.navigate).toHaveBeenCalledWith(['/home/edit-task']);
  });

  it('should delete task and refresh list', () => {
    spyOn(component, 'getAllTasks');
    const taskId = '1';

    component.deleteTask(taskId);

    expect(component.getAllTasks).toHaveBeenCalled();
  });
});
