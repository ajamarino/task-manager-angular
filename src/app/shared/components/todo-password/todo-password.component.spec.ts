import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPasswordComponent } from './todo-password.component';
import { AppModule } from 'src/app/app.module';

describe('TodoPasswordComponent', () => {
  let component: TodoPasswordComponent;
  let fixture: ComponentFixture<TodoPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoPasswordComponent ],
      imports: [AppModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
