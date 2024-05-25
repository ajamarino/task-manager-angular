import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPasswordComponent } from './todo-password.component';
import { AppModule } from 'src/app/app.module';
import { By } from '@angular/platform-browser';

describe('TodoPasswordComponent', () => {
  let component: TodoPasswordComponent;
  let fixture: ComponentFixture<TodoPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoPasswordComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change input', () => {
    spyOn(component.valueChange, 'emit');

    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    const testValue = 'test value';

    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));

    expect(component.valueChange.emit).toHaveBeenCalledWith(testValue);
  });
});
