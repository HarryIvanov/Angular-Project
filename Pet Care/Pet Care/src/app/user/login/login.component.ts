import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { appEmailValidator } from 'src/app/shared/validators/app-email.validator';
import { ErrorService } from 'src/app/core/error/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)]],
    password: ['', [Validators.required]]
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private errorService: ErrorService 
  ) {}

  login(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    this.userService.login(email!, password!).subscribe(
      (res) => {
        const userId = res?.user._id;
        this.userService.setUserId(userId);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorService.setError(error.error); 
      }
    );
  }
}

