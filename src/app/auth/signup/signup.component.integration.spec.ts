import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SignupComponent } from './signup.component';
import { HelperService } from '../../core/helper.service';
import { Store, StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import * as fromRoot from '../../app.reducers';
import * as AuthAction from '../store/auth.actions';
import { reducers } from '../../app.reducers';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha/recaptcha/recaptcha.module';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
describe('Signup form Integration Tests:', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let store: Store<fromRoot.State>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule,
        HttpClientModule,
        RecaptchaModule.forRoot(),
        RecaptchaFormsModule,
        StoreModule.forRoot(reducers),
        TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
      })
    ],
      declarations: [ SignupComponent],
      providers: [HelperService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);

    fixture.detectChanges();
  });

  it('should create SignupComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should bind form icon at the header of the form', () => {
    const de = fixture.debugElement.query(By.css('.form-logo'));

    expect(de.attributes.src).not.toBe('');
  });

  it('should initially set disabled property on submit button if form is invalid', () => {
    const button: HTMLElement = fixture.debugElement.query(By.css('.btn-lg')).nativeElement;

    expect(button.attributes['disabled']).toBeTruthy();
  });

  it('should remove disabled property on submit button if form is valid', () => {
    component.ngOnInit();
    const emailControl = component.signupForm.get('email');
    const passwordControl = component.signupForm.get('passwords').get('password');
    const repeatPasswordControl = component.signupForm.get('passwords').get('repeatPassword');
    const recaptchaControl = component.signupForm.get('recaptcha');
    const button = fixture.debugElement.query(By.css('.btn-lg'));

    emailControl.setValue('leo@leo.com');
    passwordControl.setValue('123321');
    repeatPasswordControl.setValue('123321');
    recaptchaControl.setValue(true);
    fixture.detectChanges();

    expect(button.properties.disabled).toBeFalsy();
  });

  it('should call onSubmit method if submit button is clicked', () => {
    component.ngOnInit();
    const emailControl = component.signupForm.get('email');
    const passwordControl = component.signupForm.get('passwords').get('password');
    const repeatPasswordControl = component.signupForm.get('passwords').get('repeatPassword');
    const recaptchaControl = component.signupForm.get('recaptcha');
    const spy = spyOn(component, 'onSubmit');

    emailControl.setValue('leo@leo.com');
    passwordControl.setValue('123321');
    repeatPasswordControl.setValue('123321');
    recaptchaControl.setValue(true);
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.btn-lg')).nativeElement.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });


  it('should dispatch action if form is submitted', () => {
    const spy = spyOn(store, 'dispatch');

    component.onSubmit();

    expect(spy).toHaveBeenCalled();
  });
});
