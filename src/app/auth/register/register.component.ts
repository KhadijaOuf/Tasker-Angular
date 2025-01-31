import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  //emailFormControl!: FormControl;
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  }


}
