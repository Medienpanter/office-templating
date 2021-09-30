import {Component, OnInit, ElementRef, OnDestroy} from '@angular/core';
import { AuthService } from '../../logic/services/auth/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

declare var $: any;

@Component({
  selector: 'app-login-cmp',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
  test: Date = new Date();

  public loginForm: FormGroup;
  public submitted = false;
  public serverError = '';

  private sub: Subscription;

  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;

  constructor(private element: ElementRef, private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.buildLoginForm();
    this.sub = this.loginForm.valueChanges.debounceTime(300)
                                          .distinctUntilChanged()
                                          .subscribe(val => {
                                            this.submitted = false;
                                            this.serverError = '';
                                          });

    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

    setTimeout(function() {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(): void {
    this.submitted = true;
    this.serverError = '';
    if (this.loginForm.invalid) {
      return;
    }
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService.login(email, password).subscribe(
      token => this.router.navigate(['/manage']),
      error => this.serverError = error.error.message);
  }

  sidebarToggle() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    const sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (this.sidebarVisible === false) {
      setTimeout(function() {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }

  private buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
}
