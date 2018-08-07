import { LoginComponent } from './login.component';
import { HelperService } from '../../core/helper.service';
import { Store } from '@ngrx/store';

describe('login form Unit Tests:', () => {
  let component: LoginComponent;
  let helper: HelperService;
  let store: Store<any>;

  beforeEach(() => {
    store = new Store(null, null, null);
    helper = new HelperService(store);
    component = new LoginComponent(store, helper);
    component.ngOnInit();
  });

  it('should create formGroup instance in loginForm property', () => {
    expect(component.loginForm).not.toBeUndefined();
  });

  it('should create login form with 2 controls', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should check email control as required fields', () => {
    const control = component.loginForm.get('email');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should check password control as required fields', () => {
    const control = component.loginForm.get('password');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should set loginForm to invalid if password field in empty', () => {
    const emailControl = component.loginForm.get('email');

    emailControl.setValue('leo@leo.com');

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should set loginForm to valid if email & password fields in filled', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    emailControl.setValue('leo@leo.com');
    passwordControl.setValue('123321');

    expect(component.loginForm.valid).toBeTruthy();
  });

});

