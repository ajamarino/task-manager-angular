import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AppModule } from 'src/app/app.module';

class MockAuthService {
  login(email: string, password: string) {
    if (email === 'admin@todo.com' && password === '12345678') {
      return of(true);
    } else {
      return throwError('Invalid email or password');
    }
  }
}

class MockRouter {
  navigate(path: string[]) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
      ],
      imports: [AppModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log in successfully with correct credentials', () => {
    spyOn(authService, 'login').and.returnValue(of(true));
    spyOn(router, 'navigate');

    component.email = 'admin@todo.com';
    component.password = '12345678';
    component.login();

    expect(authService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home/all-tasks']);
  });

  it('should update email value on input change', () => {
    const testEmail = 'test@example.com';

    component.onEmailInputChange(testEmail);

    expect(component.email).toBe(testEmail);
    expect(component.error).toBe('');
  });

  it('should update password value on input change', () => {
    const testPassword = 'password123';

    component.onPasswordInputChange(testPassword);

    expect(component.password).toBe(testPassword);
    expect(component.error).toBe('');
  });
});
