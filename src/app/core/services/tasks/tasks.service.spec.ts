import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { ITask } from 'src/app/shared/interfaces/ITask';

describe('TasksService', () => {
  let service: TasksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService]
    });
    service = TestBed.inject(TasksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tasks', () => {
    const mockTasks: ITask[] = [
      { id: '1', description: 'Task 1', limitDate: '2024-12-31', priority: 1, label: 1, isActive: false },
      { id: '2', description: 'Task 2', limitDate: '2024-12-30', priority: 2, label: 2, isActive: true }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toEqual('GET');
    req.flush(mockTasks);
  });

  it('should get task by id', () => {
    const mockTaskId = '1';
    const mockTask: ITask[] = [{ id: '1', description: 'Task 1', limitDate: '2024-12-31', priority: 1, label: 1, isActive: false }];

    service.getTaskById(mockTaskId).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/tasks?id=${mockTaskId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTask);
  });

  it('should create task', () => {
    const mockTask: ITask = { id: '1', description: 'New Task', limitDate: '2024-12-31', priority: 1, label: 1, isActive: false };

    service.createTask(mockTask).subscribe(createdTask => {
      expect(createdTask).toEqual(mockTask);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toEqual('POST');
    req.flush(mockTask);
  });

  it('should update task', () => {
    const mockTask: ITask = { id: '1', description: 'Updated Task', limitDate: '2024-12-31', priority: 1, label: 1, isActive: false };

    service.updateTask(mockTask).subscribe(updatedTask => {
      expect(updatedTask).toEqual(mockTask);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/tasks/${mockTask.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockTask);
  });

  it('should delete task', () => {
    const mockTaskId = '1';

    service.deleteTask(mockTaskId).subscribe(() => {
      expect().nothing(); // Expect no errors
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/tasks/${mockTaskId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });

  it('should get last ID', () => {
    const mockTasks: ITask[] = [
      { id: '1', description: 'Task 1', limitDate: '2024-12-31', priority: 1, label: 1, isActive: false },
      { id: '2', description: 'Task 2', limitDate: '2024-12-30', priority: 2, label: 2, isActive: true }
    ];

    service.getLastId().subscribe(lastId => {
      expect(lastId).toEqual(2);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toEqual('GET');
    req.flush(mockTasks);
  });
});
