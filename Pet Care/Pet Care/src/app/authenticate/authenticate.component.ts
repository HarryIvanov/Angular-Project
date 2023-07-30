import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { USER_ACCESS_TOKEN } from '../shared/constants';


@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css'],
})
export class AuthenticateComponent implements OnInit {
  isAuthenticated = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem(USER_ACCESS_TOKEN)
    console.log(token);
    
    if (token) {
      this.isAuthenticated = false;
    } else {
      this.isAuthenticated = true;
    }
  }
}
