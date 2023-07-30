import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Card } from 'src/app/types/Card';
import { UserService } from 'src/app/user/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  card: Card | undefined;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    
  }
  ngOnInit(): void {
    this.fetchCard();
    
    
  }

  fetchCard(): void {
    const id = this.activatedRoute.snapshot.params['cardId'];
      this.apiService.getCard(id).subscribe((card) => {

        this.card = card;
      });
  }
  editCardSubmitHandler(form:NgForm) :void {
    if(form.invalid){
      return;
    }
    let id = ""
    this.activatedRoute.params.subscribe((params) => {
      id = params['cardId'];
    });
    const {name, breed, age, weight, image} = form.value;
      
      this.apiService.editCard(name, breed, age, weight, image, id).subscribe(() =>{
      
      
      this.router.navigate(['/dashboard']);
     });

  }
}
