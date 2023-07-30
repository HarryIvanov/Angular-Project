import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';



@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent {
  constructor(private apiService: ApiService, private router: Router, private userService: UserService) {}
  newCardSubmitHandler(form:NgForm) :void {
    if(form.invalid){
      return;
    }
    
    
    
     const {name, breed, age, weight, image} = form.value;
     this.apiService.createCard(name, breed, age, weight, image).subscribe(() =>{
      
      this.router.navigate(['/dashboard']);
     });
  }

}


