import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  totalDonations: number | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTotalDonations().subscribe(
      response => {
        if (response && response.totalDonations !== undefined) {
          this.totalDonations = response.totalDonations;
        } else {
        }
      },
      error => {
        console.error('Error fetching total donations:', error);
      }
    );
  }
}

