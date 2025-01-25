import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // Create Form :
  loginForm!: FormGroup;     // Using '!' to assert the value will be assigned later
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailFormControl: ['', [Validators.required, Validators.email]],
      passwordFormControl: ['', [Validators.required]]
    });
  }

  matcher = new MyErrorStateMatcher();

  // Password Visibility :
  hidePassword = true;
  hide() {
    return this.hidePassword;
  }
  clickEvent(event: Event) {
    this.hidePassword = !this.hidePassword;
    event.preventDefault();
  }

  // Reset form on login :
  onSubmit() {
    if (this.loginForm.valid) {
      this.loginForm.reset();
    }
  }

  // login :
  login() {
    this.authService.signIn(this.loginForm.value.emailFormControl, this.loginForm.value.passwordFormControl);
  }


}
