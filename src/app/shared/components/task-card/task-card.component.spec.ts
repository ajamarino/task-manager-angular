import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardComponent } from './task-card.component';
import { AppModule } from 'src/app/app.module';
import { Priority } from '../../enums/Priority.enum'; // Importando o enum Priority

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCardComponent ],
      imports: [AppModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    component.task = {
      id: "1",
      description: "Task #1",
      label: 2,
      priority: 1,
      limitDate: new Date().toDateString(),
      isActive: false
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send Task',() => {
    spyOn(component.editTask, 'emit');

    const testValue = component.task;

    component.sendTask()

    expect(component.editTask.emit).toHaveBeenCalledWith(testValue);
  })

  it('should emit Task edit',() => {
    spyOn(component.editEmmiter, 'emit');

    const testValue = component.task;

    component.emitEdit()

    expect(component.editEmmiter.emit).toHaveBeenCalledWith(testValue.id);
  })

  it('should emit Task deletion',() => {
    spyOn(component.deletionEmitter, 'emit');

    const testValue = component.task;

    component.emitDeletion()

    expect(component.deletionEmitter.emit).toHaveBeenCalledWith(testValue.id);
  })


});
