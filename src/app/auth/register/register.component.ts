import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from '../authentication.service';

const log = new Logger('Register');

@UntilDestroy()
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  registerForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  private createForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.email],
      password: ['', Validators.minLength(8)],
      confirmPassword: ['', Validators.minLength(8)],
    });
  }

  register() {
    if (
      this.registerForm.valid &&
      this.registerForm.controls['password'].value.toString() ===
        this.registerForm.controls['confirmPassword'].value.toString()
    ) {
      const credentials = {
        username: this.registerForm.controls['username'].value.toString(),
        password: this.registerForm.controls['password'].value.toString(),
      };
      this.authenticationService
        .register(credentials)
        .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
