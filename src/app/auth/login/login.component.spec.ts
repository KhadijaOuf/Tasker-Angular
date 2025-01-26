import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // Mock AngularFireAuth
  const mockAngularFireAuth = {
    authState: of(null),
    signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
      ],
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
    const emailControl = component.loginForm.get('emailFormControl');
    emailControl?.setValue('');
    emailControl?.markAsTouched(); // Ensure validation is triggered
    fixture.detectChanges();

    const emailError = fixture.debugElement.query(By.css('mat-error'));
    expect(emailError).toBeTruthy();
    expect(emailError.nativeElement.textContent).toContain('Email is required');

    emailControl?.setValue('invalid-email');
    fixture.detectChanges();

    expect(emailError.nativeElement.textContent).toContain('Please enter a valid email address');
  });

  it('should call login() method when the form is valid and button is clicked', () => {
    spyOn(component, 'login');

    component.loginForm.get('emailFormControl')?.setValue('test@example.com');
    component.loginForm.get('passwordFormControl')?.setValue('password123');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.login-btn')).nativeElement;
    button.click();

    expect(component.login).toHaveBeenCalled();
  });
});

