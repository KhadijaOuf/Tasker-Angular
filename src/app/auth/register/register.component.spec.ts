import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { SharedModule } from '../../shared/shared.module';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        SharedModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with email control', () => {
    expect(component.emailFormControl).toBeTruthy();
  });

  it('should have a disabled sign-up button when the email is invalid', () => {
    const button = fixture.debugElement.query(By.css('.signup-btn')).nativeElement;

    // Initially invalid as email is empty
    expect(button.disabled).toBeTrue();

    // Set a valid email to make the form valid
    component.emailFormControl.setValue('test@example.com');
    fixture.detectChanges();

    // Now the button should be enabled
    expect(button.disabled).toBeFalse();
  });

  it('should show email validation error when email is invalid', () => {
    component.emailFormControl.setValue('');
    fixture.detectChanges();

    const emailError = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(emailError).toBeTruthy();
    expect(emailError.textContent).toContain('Email is required');

    // Now setting an invalid email
    component.emailFormControl.setValue('invalid-email');
    fixture.detectChanges();

    expect(emailError.textContent).toContain('Please enter a valid email address');
  });

  it('should call signUp() method when the form is valid and button is clicked', () => {
    spyOn(component, 'signUp');

    // Set valid email
    component.emailFormControl.setValue('test@example.com');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.signup-btn')).nativeElement;
    button.click();

    expect(component.signUp).toHaveBeenCalled();
  });

  it('should not call signUp() method when the form is invalid and button is clicked', () => {
    spyOn(component, 'signUp');

    // Initially invalid
    component.emailFormControl.setValue('');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.signup-btn')).nativeElement;
    button.click();

    expect(component.signUp).not.toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
