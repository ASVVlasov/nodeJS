import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.pug',
  styleUrls: ['./new-user.component.scss']
})

export class NewUserComponent implements OnInit {

  @Input() selectedUser: Observable<User>;
  @Output() onSave = new EventEmitter<string>();

  isNew: boolean;
  userControl: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
  }

  getFormGroup(user):FormGroup {
    return this.fb.group({
      _id             : [user._id],
      firstName       : [user.firstName],
      lastName        : [user.lastName],
      nickName        : [user.nickName],
      email           : [user.email],
      age             : [user.age],
    });
  }

  ngOnInit() {
    this.selectedUser.subscribe((user: User) => {
      this.userControl = this.getFormGroup(user);
      this.isNew = !user._id;
    })
    this.userControl = this.getFormGroup({});
  }

  addUser(): void {
    this.userService.addUser(this.userControl.value).subscribe((data) => {
      this.onSave.emit('save');
    });
  }

  saveUser(): void {
    this.userService.saveUser(this.userControl.value).subscribe((data) => {
      this.onSave.emit('save');
    })
  }

}
