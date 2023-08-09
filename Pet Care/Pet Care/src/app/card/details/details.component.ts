import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Card } from 'src/app/types/Card';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  card: Card | undefined;
  owner: boolean | undefined
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    
  }
  
  get isLogged(): boolean {
    return this.userService.isLogged;
  }



  ngOnInit(): void {
    this.fetchCard();
    this.isOwner();
  }

  fetchCard(): void {
    const id = this.activatedRoute.snapshot.params['cardId'];
      this.apiService.getCard(id).subscribe((card) => {
        this.card = card;
      });
  }
  Delete(): void {
    const id = this.activatedRoute.snapshot.params['cardId'];
    this.apiService.deleteCard(id).subscribe(
      (response) => {
        // Handle the successful response (if needed)
        console.log('DELETE request successful:', response);
        this.router.navigate(["/dashboard"])
      },
      (error) => {
        // Handle errors (if any)
        console.error('Error:', error);
      }
    );
  }
  
  isOwner() :void {
   console.log(this.card?.owner);
   console.log(this.userService.getUserId())
   const ownerId = this.card?.owner 
   const user = this.userService.getUserId();
   
   if (user == ownerId) {
    this.owner = true;
    console.log('owner');
    
   }
   console.log("not owner");
   
  }
}

