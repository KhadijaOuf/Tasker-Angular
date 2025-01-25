import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        SharedModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with email and password controls', () => {
    expect(component.loginForm.contains('emailFormControl')).toBeTruthy();
    expect(component.loginForm.contains('passwordFormControl')).toBeTruthy();
  });

  it('should have a disabled login button when the form is invalid', () => {
    const button = fixture.debugElement.query(By.css('.login-btn')).nativeElement;

    // Initially invalid as the fields are empty
    expect(button.disabled).toBeTrue();

    // Set valid email and password to make the form valid
    component.loginForm.get('emailFormControl')?.setValue('test@example.com');
    component.loginForm.get('passwordFormControl')?.setValue('password123');
    fixture.detectChanges();

    // Now the button should be enabled
    expect(button.disabled).toBeFalse();
  });

  it('should show email validation error when email is invalid', () => {
    component.loginForm.get('emailFormControl')?.setValue('');
    fixture.detectChanges();

    const emailError = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(emailError).toBeTruthy();
    expect(emailError.textContent).toContain('Email is required');

    // Now setting an invalid email
    component.loginForm.get('emailFormControl')?.setValue('invalid-email');
    fixture.detectChanges();

    expect(emailError.textContent).toContain('Please enter a valid email address');
  });

  it('should show password validation error when password is missing', () => {
    component.loginForm.get('passwordFormControl')?.setValue('');
    fixture.detectChanges();

    const passwordError = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(passwordError).toBeTruthy();
    expect(passwordError.textContent).toContain('Password is required');
  });

  it('should call login() method when the form is valid and button is clicked', () => {
    spyOn(component, 'login');

    // Set valid email and password
    component.loginForm.get('emailFormControl')?.setValue('test@example.com');
    component.loginForm.get('passwordFormControl')?.setValue('password123');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.login-btn')).nativeElement;
    button.click();

    expect(component.login).toHaveBeenCalled();
  });

  it('should not call login() method when the form is invalid and button is clicked', () => {
    spyOn(component, 'login');

    // Initially invalid form
    component.loginForm.get('emailFormControl')?.setValue('');
    component.loginForm.get('passwordFormControl')?.setValue('');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.login-btn')).nativeElement;
    button.click();

    expect(component.login).not.toHaveBeenCalled();
  });

  it('should toggle password visibility when the icon is clicked', () => {
    const initialType = component.loginForm.get('passwordFormControl')?.value;
    const iconButton = fixture.debugElement.query(By.css('button[mat-icon-button]')).nativeElement;

    // Initially password is hidden (should be of type 'password')
    expect(component.hide()).toBeTrue();

    // Click to toggle visibility
    iconButton.click();
    fixture.detectChanges();
    expect(component.hide()).toBeFalse();

    // Click again to toggle visibility back
    iconButton.click();
    fixture.detectChanges();
    expect(component.hide()).toBeTrue();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
