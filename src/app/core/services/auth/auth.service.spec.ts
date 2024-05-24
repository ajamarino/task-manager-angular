import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { IUser } from 'src/app/shared/interfaces/IUser';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in with correct credentials', () => {
    const mockUser: IUser[] = [{ id: "1", username: 'test@example.com', password: 'password' }];

    service.login('test@example.com', 'password').subscribe(loggedIn => {
      expect(loggedIn).toBeTrue();
      expect(service.isLoggedIn()).toBeTrue();
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/users?email=test@example.com&password=password`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUser);
  });

  it('should not log in with incorrect credentials', () => {
    service.login('wrong@example.com', 'wrongpassword').subscribe(loggedIn => {
      expect(loggedIn).toBeFalse();
      expect(service.isLoggedIn()).toBeFalse();
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/users?email=wrong@example.com&password=wrongpassword`);
    expect(req.request.method).toEqual('GET');
    req.flush([]);
  });

  it('should log out', () => {
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
  });
});
