import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { TaskComponent } from './modules/task/task.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {path: '', redirectTo: '/tasks', pathMatch: 'full'},
  {path: 'tasks', component: TaskComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  providers: [AuthGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
