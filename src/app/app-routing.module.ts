import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AllTasksComponent } from './pages/all-tasks/all-tasks.component';
import { TodayComponent } from './pages/today/today.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, children: [
    { path: '', redirectTo: 'all-tasks', pathMatch: 'full' },
    { path: 'all-tasks', component: AllTasksComponent },
    { path: 'today', component: TodayComponent },
    { path: 'new-task', component: NewTaskComponent },
    { path: 'edit-task', component: EditTaskComponent },

  ] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
