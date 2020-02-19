import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.pug',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error: string = '';
  registerGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerGroup = this._fb.group({
      username: [],
      password: [],
      firstName: [],
      lastName: []
    });
  }

  onSubmit(value) {
    this._authService.register(value).subscribe((data: any) => {
      if (data.message) {
        this.error = data.message.message;
      }
      this.router.navigate(['tasks']);
    })
  }
}
