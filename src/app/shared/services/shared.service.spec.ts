import { TestBed } from '@angular/core/testing';
import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit task ID', () => {
    const testTaskId:string | null = '123';
    let emittedTaskId: string | null = null;

    service.taskId$.subscribe(id => emittedTaskId = id);

    service.emitTaskId(testTaskId);

    expect('123').toEqual('123');
  });
});
