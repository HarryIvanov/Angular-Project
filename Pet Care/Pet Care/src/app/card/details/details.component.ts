import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Card } from 'src/app/types/Card';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  card: Card | undefined;
  owns: boolean | any;
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    // this.isOwner();
    this.fetchCard();
  }

  fetchCard(): void {
    const id = this.activatedRoute.snapshot.params['cardId'];
    this.apiService.getCard(id).subscribe((card) => {
      this.card = card;
      const ownerId = this.card?.owner;
      const user = this.userService.getUserId();
      console.log(card);
      

      if (user == ownerId) {
        this.owns = true;
        console.log('owner');
      } else {
        this.owns = false;
        console.log('not owner');
      }
    });
  }
  Delete(): void {
    const id = this.activatedRoute.snapshot.params['cardId'];
    this.apiService.deleteCard(id).subscribe(
      (response) => {
        // Handle the successful response (if needed)
        console.log('DELETE request successful:', response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Handle errors (if any)
        console.error('Error:', error);
      }
    );
  }
  Edit(id: string) {
    this.router.navigate([`/edit-card/${id}`])
  }
  donate() {
    if (!this.card) {
      return;
    }
  
    // Increment the donation amount by $5
    this.card.donation = (this.card.donation || 0) + 5;
  
    // Update the card in the database
    this.apiService.updateCard(this.card).subscribe(
      (updatedCard) => {
        // Update the card details with the response
        this.card = updatedCard;
        console.log('Donation successful');
      },
      (error) => {
        console.error('Error donating:', error);
      }
    );
  }

}
