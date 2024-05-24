import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { TasksService } from "src/app/core/services/tasks/tasks.service";
import { Label } from "src/app/shared/enums/Label.enum";
import { Priority } from "src/app/shared/enums/Priority.enum";
import { ITask } from "src/app/shared/interfaces/ITask";
import { NewTaskComponent } from "./new-task.component";
import { AppModule } from "src/app/app.module";

class MockTasksService {
  getLastId() {
    return of(1);
  }

  createTask(task: ITask) {
    return of(task);
  }
}

class MockRouter {
  navigate(path: string[]) {}
}

describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;
  let tasksService: TasksService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTaskComponent ],
      providers: [
        { provide: TasksService, useClass: MockTasksService },
        { provide: Router, useClass: MockRouter }
      ],
      imports: [AppModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(TasksService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct header and descriptionInput values', () => {
    expect(component.header).toEqual({
      title: "Nova tarefa",
      hasButton: false
    });
    expect(component.descriptionInput).toEqual({
      label: "Descrição",
      value: "",
      placeholder: ""
    });
  });

  it('should change description on onDescInputChange', () => {
    const desc = 'New Description';
    component.onDescInputChange(desc);
    expect(component.description).toBe(desc);
  });

  it('should create a task and navigate on success', () => {
    spyOn(router, 'navigate');
    component.description = 'Test Task';
    component.priority = Priority.Médio;
    component.label = Label.Escola;
    component.limitDate = new Date('2024-12-31');

    component.createTask();

    expect(router.navigate).toHaveBeenCalledWith(['/home/all-tasks']);
  });

});
