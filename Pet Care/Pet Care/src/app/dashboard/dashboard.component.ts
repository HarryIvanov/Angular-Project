import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Card } from '../types/Card';
import { UserService } from '../user/user.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  cardsList: Card[] = [];
  isLoading: boolean = true;
  check : boolean = true;
  constructor(private apiService: ApiService, private userService: UserService) {}

  get isLogged(): boolean {
    return this.userService.isLogged
  }

  ngOnInit(): void {
    
    this.apiService.getCards().subscribe({
      next: (cards) => {
        this.cardsList = cards;
        this.isLoading = false;
        if (cards.length == 0) {
          this.check = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(`Error: ${err}`);
      }
    });
  }
}


