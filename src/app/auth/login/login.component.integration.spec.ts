import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { HelperService } from '../../core/helper.service';
import { Store, StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import * as fromRoot from '../../app.reducers';
import * as AuthAction from '../store/auth.actions';
import { reducers } from '../../app.reducers';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
describe('login form Integration Tests:', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<fromRoot.State>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
      })
    ],
      declarations: [ LoginComponent],
      providers: [HelperService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);

    fixture.detectChanges();
  });

  it('should create LoginComponent', () => {
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
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');
    const button = fixture.debugElement.query(By.css('.btn-lg'));

    emailControl.setValue('leo@leo.com');
    passwordControl.setValue('123321');
    fixture.detectChanges();

    expect(button.properties.disabled).toBeFalsy();
  });

  it('should call onSubmit method if submit button is clicked', () => {
    component.ngOnInit();
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');
    const spy = spyOn(component, 'onSubmit');

    emailControl.setValue('leo@leo.com');
    passwordControl.setValue('123321');
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
