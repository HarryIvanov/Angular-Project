import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Card } from 'src/app/types/Card';
import { UserService } from 'src/app/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { numberValidator } from 'src/app/shared/validators/number-validator';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  card: Card | any;
  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
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

  ngOnInit(): void {
    this.fetchCard();
  }

  fetchCard(): void {
    const id = this.activatedRoute.snapshot.params['cardId'];
    this.apiService.getCard(id).subscribe((card) => {
      this.card = card;
      this.form.patchValue(card);
    });
  }

  editCardSubmitHandler(): void {
    if (this.form.invalid) {
      return;
    }

    const { name, breed, age, weight, image } = this.form.value;

    this.apiService.editCard(name, breed, age, weight, image, this.card?._id)
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
  }
}
