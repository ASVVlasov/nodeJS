import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './modules/user/user-list/user-list.component';


const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: '**', redirectTo: '/users'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
