import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NewUserModule } from '../new-user/new-user.module';
import { NewUserComponent } from '../new-user/new-user.component';



@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    NewUserModule
  ],
  exports: [NewUserComponent]
})
export class UserModule { }
