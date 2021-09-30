import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import {AuthService} from '../../logic/services/auth/auth.service';

@Component({
    selector: 'app-register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  public signupForm: FormGroup;
  public submitted = false;
  public serverError = '';

  private sub: Subscription;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.buildSignupForm();
    this.sub = this.signupForm.valueChanges.debounceTime(300)
                   .distinctUntilChanged()
                   .subscribe(val => {
                      this.submitted = false;
                      this.serverError = '';
                   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(): void {
    this.submitted = true;
    this.serverError = '';
    if (this.signupForm.invalid) {
      return;
    }
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const firstName = this.signupForm.get('firstName').value;
    const lastName = this.signupForm.get('lastName').value;
    this.authService.signup(email, password, firstName, lastName).subscribe(
      response => this.router.navigate(['/pages/login']),
      error => this.serverError = error.error.message);
  }

  private buildSignupForm(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      terms: ['', [Validators.requiredTrue]]
    });
  }
}
