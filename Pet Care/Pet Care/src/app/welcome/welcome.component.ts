import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  constructor(private userService: UserService, private router: Router) {

  }

  get isLogged(): boolean {
      return this.userService.isLogged
  }
}
