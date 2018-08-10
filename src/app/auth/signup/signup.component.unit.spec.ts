import { SignupComponent } from './signup.component';
import { HelperService } from '../../core/helper.service';
import { Store } from '@ngrx/store';

describe('Signup form Unit Tests:', () => {
  let component: SignupComponent;
  let helper: HelperService;
  let store: Store<any>;

  beforeEach(() => {
    store = new Store(null, null, null);
    helper = new HelperService(store);
    component = new SignupComponent(store, helper);
    component.ngOnInit();
  });

  it('should create formGroup instance in signupForm property', () => {
    expect(component.signupForm).not.toBeUndefined();
  });

  it('should create Signup-form with 7 controls and 2 sub-controls', () => {
    expect(component.signupForm.contains('email')).toBeTruthy();
    expect(component.signupForm.contains('passwords')).toBeTruthy();
    expect(component.signupForm.get('passwords').get('password')).toBeTruthy();
    expect(component.signupForm.get('passwords').get('repeatPassword')).toBeTruthy();
    expect(component.signupForm.contains('name')).toBeTruthy();
    expect(component.signupForm.contains('icq')).toBeTruthy();
    expect(component.signupForm.contains('skype')).toBeTruthy();
    expect(component.signupForm.contains('promoKey')).toBeTruthy();
    expect(component.signupForm.contains('recaptcha')).toBeTruthy();
  });

  it('should check EMAIL control as required field', () => {
    const control = component.signupForm.get('email');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should check RECAPTCHA control as required field', () => {
    const control = component.signupForm.get('email');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should check PASSWORD control as required field', () => {
    const control = component.signupForm.get('passwords').get('password');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should check REPEAT_PASSWORD control as required field', () => {
    const control = component.signupForm.get('passwords').get('repeatPassword');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should set signupForm to invalid if EMAIL field in empty', () => {
    const passwordControl = component.signupForm.get('passwords').get('password');
    const repeatPasswordControl = component.signupForm.get('passwords').get('repeatPassword');
    const recaptchaControl = component.signupForm.get('recaptcha');

    passwordControl.setValue('123321');
    repeatPasswordControl.setValue('123321');
    recaptchaControl.setValue(true);

    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should set signupForm to invalid if PASSWORD field in empty', () => {
    const emailControl = component.signupForm.get('email');
    const repeatPasswordControl = component.signupForm.get('passwords').get('repeatPassword');
    const recaptchaControl = component.signupForm.get('recaptcha');

    emailControl.setValue('leo@leo.com');
    repeatPasswordControl.setValue('123321');
    recaptchaControl.setValue(true);

    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should set signupForm to invalid if REPEAT_PASSWORD field in empty', () => {
    const emailControl = component.signupForm.get('email');
    const passwordControl = component.signupForm.get('passwords').get('password');
    const recaptchaControl = component.signupForm.get('recaptcha');

    emailControl.setValue('leo@leo.com');
    passwordControl.setValue('123321');
    recaptchaControl.setValue(true);

    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should set signupForm to invalid if RECAPTCHA field in empty', () => {
    const emailControl = component.signupForm.get('email');
    const passwordControl = component.signupForm.get('passwords').get('password');
    const repeatPasswordControl = component.signupForm.get('passwords').get('repeatPassword');

    emailControl.setValue('leo@leo.com');
    passwordControl.setValue('123321');
    repeatPasswordControl.setValue('123321');

    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should set signupForm to invalid if PASSWORD and REPEAT_PASSWORD not match', () => {
    const emailControl = component.signupForm.get('email');
    const passwordControl = component.signupForm.get('passwords').get('password');
    const repeatPasswordControl = component.signupForm.get('passwords').get('repeatPassword');
    const recaptchaControl = component.signupForm.get('recaptcha');

    emailControl.setValue('leo@leo.com');
    passwordControl.setValue('123322');
    repeatPasswordControl.setValue('123321');
    recaptchaControl.setValue(true);

    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should set signupForm to valid if EMAIL, PASSWORD, REPEAT_PASSWORD, RECAPTCHA fields are filled properly', () => {
    const emailControl = component.signupForm.get('email');
    const passwordControl = component.signupForm.get('passwords').get('password');
    const repeatPasswordControl = component.signupForm.get('passwords').get('repeatPassword');
    const recaptchaControl = component.signupForm.get('recaptcha');

    emailControl.setValue('leo@leo.com');
    passwordControl.setValue('123321');
    repeatPasswordControl.setValue('123321');
    recaptchaControl.setValue(true);

    expect(component.signupForm.valid).toBeTruthy();
  });

});


