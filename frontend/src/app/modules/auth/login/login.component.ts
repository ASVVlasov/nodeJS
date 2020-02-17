import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginGroup = this._fb.group({
      username: [],
      password: []
    });
  }

  onSubmit(value) {
    this._authService.login(value).subscribe((data) => {
      console.log(data);
      this.router.navigate(['tasks']);
    })
  }

}
