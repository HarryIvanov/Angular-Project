import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { appEmailValidator } from 'src/app/shared/validators/app-email.validator';
import { matchPasswordsValidator } from 'src/app/shared/validators/match-passwords.validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form = this.fb.group({
    email: [
      '',
      [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)],
    ],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  register(): void {
    if (this.form.invalid) {
        return;
    }

    const email = this.form.get('email')?.value;
    const password = this.form.get('passGroup.password')?.value;
    const rePassword = this.form.get('passGroup.rePassword')?.value;

    if (!email || !password || !rePassword) {
        return;
    }

    this.userService.register(email, password, rePassword).subscribe((response) => {
        localStorage.setItem('user_id', response.user._id); // Set the user's ID
        localStorage.setItem('access_token', response.accessToken); // Set the access token
        this.router.navigate(['/']); // Redirect to a protected route
    });
}
}
