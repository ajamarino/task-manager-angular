import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TodoInputComponent } from './shared/components/todo-input/todo-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TodoPasswordComponent } from './shared/components/todo-password/todo-password.component';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AllTasksComponent } from './pages/all-tasks/all-tasks.component';
import { SidenavContentComponent } from './shared/components/sidenav-content/sidenav-content.component';
import { TodayComponent } from './pages/today/today.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TaskCardComponent } from './shared/components/task-card/task-card.component';
import {MatCardModule} from '@angular/material/card';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { FormControl, FormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth/auth.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TodoInputComponent,
    TodoPasswordComponent,
    AllTasksComponent,
    SidenavContentComponent,
    TodayComponent,
    HeaderComponent,
    TaskCardComponent,
    NewTaskComponent,
    EditTaskComponent,

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
    MatSidenavModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
