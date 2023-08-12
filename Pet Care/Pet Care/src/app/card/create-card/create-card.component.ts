import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';
import { numberValidator } from 'src/app/shared/validators/number-validator';


@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
})
export class CreateCardComponent {
  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required, numberValidator()]],
      breed: ['', [Validators.required]],
      weight: ['', [Validators.required, numberValidator()]],
      image: ['', [Validators.required]],
    });
  }

  newCardSubmitHandler(): void {
    if (this.form.invalid) {
      return;
    }
    const donation = 0;
    const owner = this.userService.getUserId();
    const { name, breed, age, weight, image } = this.form.value;
    
    this.apiService.createCard(name, breed, age, weight, image, owner, donation).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
