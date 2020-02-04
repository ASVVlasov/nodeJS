import {
  Component
} from '@angular/core';
import {
  Users
} from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  displayedColumns: string[] = ['firstName', 'lastName', 'nickName', 'email', 'age'];
  dataSource = Users;

}