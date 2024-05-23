import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000/users'
  private loggedIn = false;

  constructor( private http: HttpClient) { }

  login(email:string, password:string): Observable<boolean>{
    console.log(email, password)
    return this.http.get<IUser[]>(`${this.url}?email=${email}&password=${password}`).pipe(
      map(users =>{
        console.log(users)
        if(users.length > 0){
          this.loggedIn = true;
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    )
  }

  logout():void {
    this.loggedIn = false;
  }

  isLoggedIn():boolean {
    return this.loggedIn;
  }
}
