import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NewTaskComponent } from './new-task.component';
import { TasksService } from 'src/app/core/services/tasks/tasks.service';
import { Priority } from 'src/app/shared/enums/Priority.enum';
import { Label } from 'src/app/shared/enums/Label.enum';
import { AppModule } from 'src/app/app.module';

describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let tasksService: jasmine.SpyObj<TasksService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const tasksServiceSpy = jasmine.createSpyObj('TasksService', ['getLastId', 'createTask']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [NewTaskComponent],
      providers: [
        { provide: TasksService, useValue: tasksServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [
        AppModule
      ]
    });

    const fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(TasksService) as jasmine.SpyObj<TasksService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create a task successfully and navigate to all tasks', () => {
    tasksService.getLastId.and.returnValue(of(1));
    tasksService.createTask.and.returnValue(of({ id: '2', description: 'Test Task', limitDate: '', priority: Priority.Baixo, label: Label.Casa, isActive: false }));
    component.description = 'Test Task';
    component.priority = Priority.Baixo;
    component.label = Label.Casa;

    component.createTask();

    expect(tasksService.getLastId).toHaveBeenCalled();
    expect(tasksService.createTask).toHaveBeenCalledWith({
      id: '2',
      description: 'Test Task',
      limitDate: '',
      priority: Priority.Baixo,
      label: Label.Casa,
      isActive: false
    });
    expect(router.navigate).toHaveBeenCalledWith(['/home/all-tasks']);
  });

  it('should log an error when createTask fails', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    const mockError = new Error('Test error');
    tasksService.getLastId.and.returnValue(of(1));
    tasksService.createTask.and.returnValue(throwError(() => mockError));
    component.description = 'Test Task';
    component.priority = Priority.Baixo;
    component.label = Label.Casa;

    component.createTask();

    expect(tasksService.getLastId).toHaveBeenCalled();
    expect(tasksService.createTask).toHaveBeenCalledWith({
      id: '2',
      description: 'Test Task',
      limitDate: '',
      priority: Priority.Baixo,
      label: Label.Casa,
      isActive: false
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating task', mockError);
  });

  it('should change input value', () => {
    component.onDescInputChange("teste")

    expect(component.description).toEqual("teste")
  })
});
