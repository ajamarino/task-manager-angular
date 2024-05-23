import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { IInput } from 'src/app/shared/interfaces/IInput';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent {

  emailInput:IInput = {
    label: "Email",
    placeholder: "Email",
    value: ""
  }

  email: string = "";
  password: string = "";

  error: string = "";

  hide: boolean = false;

  constructor(private authService: AuthService, private router: Router){}

  login():void {
    this.authService.login(this.email, this.password).subscribe(sucess => {
      if(sucess) this.router.navigate(['/home/all-tasks'])
      return;
    })

    this.error = "Usuário ou senha incorretos"
  }

  onEmailInputChange(value: string){
    this.email = value;
    this.error = "";
    console.log(this.error)
  }

  onPasswordInputChange(value: string){
    this.password = value;
    this.error = ""
    console.log(this.error)
  }


}
