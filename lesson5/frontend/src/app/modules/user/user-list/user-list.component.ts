import { Component, OnInit, Output } from '@angular/core';
import { Users, User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.pug',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'nickName', 'email', 'age', 'delete'];
  dataSource: User[] = [];

  selectedUser = new BehaviorSubject({});

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.dataSource = users;
    });
  }

  deleteUser($event: Event, user: User): void {
    $event.stopPropagation();
    this.userService.deleteUser(user).subscribe((data) => {
      this.getUsers();
      console.log(data);
    });
  }

  selectUser(row) {
    row.selected = !row.selected;
    this.dataSource.forEach((user: any) => {
      if (row._id !== user._id) {
        user.selected = false;
      }
    });
    if (row.selected) {
      this.selectedUser.next(row);
    } else {
      this.selectedUser.next({});
    }
  }

}
