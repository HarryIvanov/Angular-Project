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

  // isOwner(): void {
  //   console.log(this.card);
  //   console.log(this.card?.owner);
  //   console.log(this.userService.getUserId());
  //   const ownerId = this.card?.owner;
  //   const user = this.userService.getUserId();

  //   if (user == ownerId) {
  //     this.owns = true;
  //     console.log('owner');
  //   } else {
  //     this.owns = false;
  //     console.log('not owner');
  //   }
  // }
}
