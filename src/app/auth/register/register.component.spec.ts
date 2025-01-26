import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../../shared/shared.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  // Mock AngularFireAuth
  const mockAngularFireAuth = {
    authState: of(null),
    createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [SharedModule],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
      ],
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
    component.emailFormControl.markAsTouched(); // Ensure validation is triggered
    fixture.detectChanges();

    const emailError = fixture.debugElement.query(By.css('mat-error'));
    expect(emailError).toBeTruthy();
    expect(emailError.nativeElement.textContent).toContain('Email is required');

    component.emailFormControl.setValue('invalid-email');
    fixture.detectChanges();

    expect(emailError.nativeElement.textContent).toContain('Please enter a valid email address');
  });

  it('should call signUp() method when the form is valid and button is clicked', () => {
    spyOn(component, 'signUp');

    component.emailFormControl.setValue('test@example.com');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.signup-btn')).nativeElement;
    button.click();

    expect(component.signUp).toHaveBeenCalled();
  });
});

