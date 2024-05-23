import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TodoInputComponent } from './shared/todo-input/todo-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TodoPasswordComponent } from './shared/todo-password/todo-password.component';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AllTasksComponent } from './pages/all-tasks/all-tasks.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TodoInputComponent,
    TodoPasswordComponent,
    AllTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
